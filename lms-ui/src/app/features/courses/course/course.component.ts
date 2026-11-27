import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { API_BASE_URL } from '../../../core/services/api.constants';

interface Course {
  courseId: string;
  courseName: string;
  description: string;
  level: string;
  technology: string;
  status: string;
  levelId?: number;
  technologyId?: number;
  statusId?: number;
  createdAt: any;
  image?: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CoursesComponent implements OnInit {

  /* ================================
     PAGE STATE
  ================================= */

  searchText = '';
  selectedStatus = '';

  showCourseForm = false;
  editMode = false;

  selectedImage: string | null = null;


  /* ================================
     FORM
  ================================= */

  courseForm = {
    courseId: '',
    courseName: '',
    description: '',
    levelId: null as number | null,
    technologyId: null as number | null,
    statusId: null as number | null,
    createdAt: ''
  };


  /* ================================
     MASTER DATA
  ================================= */

  levels: { label: string; value: number }[] = [];
  technologies: { label: string; value: number }[] = [];
  statuses: { label: string; value: number }[] = [];
  levelsLoading = false;
  technologiesLoading = false;
  statusesLoading = false;
  courses: Course[] = [];

  private readonly apiUrl = `${API_BASE_URL}/courses`;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadComboOptions();
    this.loadCourses();
  }

  

  get statusFilterOptions(): { label: string; value: string }[] {
    return [
      { label: 'All Status', value: '' },
      ...this.statuses.map(status => ({
        label: status.label,
        value: status.label
      }))
    ];
  }


  private loadCourses(): void {
  this.http
    .get<CourseApiResponse[]>(`${this.apiUrl}/getAllCourses`)
    .subscribe({
      next: courses => {
        this.courses = courses.map(course => ({
          courseId: String(course.courseId),
          courseName: course.courseName,
          description: course.description ?? '',
          level:
            this.findOptionLabel(this.levels, course.levelId) ||
            course.level,
          technology:
            this.findOptionLabel(this.technologies, course.technologyId) ||
            String(course.technologyId),
          status:
            this.findOptionLabel(this.statuses, course.statusId) ||
            course.status,
          createdAt: ''
        }));
      },
      error: error => {
        console.error('Failed to load courses:', error);
      }
    });
}



  /* ================================
     STATISTICS
  ================================= */

  get totalCourses(): number {
    return this.courses.length;
  }

  get publishedCourses(): number {
    return this.courses.filter(
      course => course.status === 'Published'
    ).length;
  }

  get draftCourses(): number {
    return this.courses.filter(
      course => course.status === 'Draft'
    ).length;
  }

  /*
   * Temporary value.
   * Later this will come from backend.
   */
  totalLearners = 1245;

  private loadComboOptions(): void {
    this.levelsLoading = true;
    this.http.get<{ levelId: number; levelName: string }[]>(`${this.apiUrl}/levels`).subscribe({
      next: values => this.levels = (values ?? []).map(item => ({
        label: this.toDisplayName(item.levelName),
        value: item.levelId
      })),
      error: error => {
        console.error('Failed to load course levels', error);
        this.levelsLoading = false;
      },
      complete: () => this.levelsLoading = false
    });

    this.technologiesLoading = true;
    this.http.get<{ technologyId: number; technologyName: string }[]>(`${this.apiUrl}/technologies`).subscribe({
      next: values => this.technologies = (values ?? []).map(item => ({
        label: item.technologyName,
        value: item.technologyId
      })),
      error: error => {
        console.error('Failed to load course technologies', error);
        this.technologiesLoading = false;
      },
      complete: () => this.technologiesLoading = false
    });

    this.statusesLoading = true;
    this.http.get<{ statusId: number; statusName: string }[]>(`${this.apiUrl}/statuses`).subscribe({
      next: values => {
        this.statuses = (values ?? []).map(item => ({
          label: this.toDisplayName(item.statusName),
          value: item.statusId
        }));
        if (this.courseForm.statusId === null && this.statuses.length) {
          this.courseForm.statusId = this.statuses[0].value;
        }
      },
      error: error => {
        console.error('Failed to load course statuses', error);
        this.statusesLoading = false;
      },
      complete: () => this.statusesLoading = false
    });
  }

  private toDisplayName(value: string): string {
    return value
      .toLowerCase()
      .replace(/\b\w/g, character => character.toUpperCase());
  }

  private findOptionValue(
    options: { label: string; value: number }[],
    label: string
  ): number | null {
    return options.find(option =>
      option.label.toLowerCase() === label.toLowerCase()
    )?.value ?? null;
  }

  private findOptionLabel(
    options: { label: string; value: number }[],
    value: number | null
  ): string {
    return options.find(option => option.value === value)?.label ?? '';
  }


  /* ================================
     FILTERED COURSES
  ================================= */

  get filteredCourses(): Course[] {

    const search = this.searchText
      .trim()
      .toLowerCase();

    return this.courses.filter(course => {

      const matchesSearch =
        !search ||
        course.courseName
          .toLowerCase()
          .includes(search);

      const matchesStatus =
      !this.selectedStatus ||
        course.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }


  /* ================================
     ADD COURSE
  ================================= */

  openAddCourse(): void {

    this.editMode = false;
    this.showCourseForm = true;

    this.resetForm();

  }


  /* ================================
     EDIT COURSE
  ================================= */

  editCourse(course: Course): void {

    this.editMode = true;
    this.showCourseForm = true;

    this.courseForm = {
      courseId: course.courseId,
      courseName: course.courseName,
      description: course.description,
      levelId: course.levelId ?? this.findOptionValue(this.levels, course.level),
      technologyId: course.technologyId ?? this.findOptionValue(this.technologies, course.technology),
      statusId: course.statusId ?? this.findOptionValue(this.statuses, course.status),
      createdAt: course.createdAt
    };

    this.selectedImage = course.image || null;
  }


  /* ================================
     VIEW COURSE
  ================================= */

  viewCourse(course: Course): void {

    console.log('View course:', course);

  }


  /* ================================
     DELETE COURSE
  ================================= */

  deleteCourse(course: Course): void {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.courseName}"?`
    );

    if (!confirmed) {
      return;
    }

    this.courses = this.courses.filter(
      item => item.courseId !== course.courseId
    );

  }


  /* ================================
     SAVE COURSE
  ================================= */

  saveCourse(): void {

    if (!this.validateCourse()) {
      return;
    }

    if (this.editMode) {

      this.updateCourse();

    } else {

      this.addCourse();

    }

    this.closeCourseForm();

  }


  /* ================================
     VALIDATION
  ================================= */

  private validateCourse(): boolean {

    if (!this.courseForm.courseName.trim()) {

      alert('Please enter course name.');

      return false;
    }

    if (!this.courseForm.description.trim()) {

      alert('Please enter course description.');

      return false;
    }

    if (this.courseForm.levelId === null) {

      alert('Please select level.');

      return false;
    }

    if (this.courseForm.technologyId === null) {

      alert('Please select technology.');

      return false;
    }

    if (this.courseForm.statusId === null) {

      alert('Please select status.');

      return false;
    }

    return true;
  }


  /* ================================
     ADD
  ================================= */

  private addCourse(): void {

    const nextNumber = this.courses.length + 1;

    const newCourse: Course = {

      courseId:
        `CRS${String(nextNumber).padStart(3, '0')}`,

      courseName:
        this.courseForm.courseName.trim(),

      description:
        this.courseForm.description.trim(),

      level:
        this.findOptionLabel(this.levels, this.courseForm.levelId),

      levelId:
        this.courseForm.levelId ?? undefined,

      technology:
        this.findOptionLabel(this.technologies, this.courseForm.technologyId),

      technologyId:
        this.courseForm.technologyId ?? undefined,

      status:
        this.findOptionLabel(this.statuses, this.courseForm.statusId),

      statusId:
        this.courseForm.statusId ?? undefined,

      createdAt:
        this.formatDate(new Date()),

      image:
        this.selectedImage || undefined

    };

    this.courses = [
      ...this.courses,
      newCourse
    ];

  }


  /* ================================
     UPDATE
  ================================= */

  private updateCourse(): void {

    const index = this.courses.findIndex(
      course =>
        course.courseId === this.courseForm.courseId
    );

    if (index === -1) {
      return;
    }

    this.courses[index] = {

      ...this.courses[index],

      courseName:
        this.courseForm.courseName.trim(),

      description:
        this.courseForm.description.trim(),

      level:
        this.findOptionLabel(this.levels, this.courseForm.levelId),

      levelId:
        this.courseForm.levelId ?? undefined,

      technology:
        this.findOptionLabel(this.technologies, this.courseForm.technologyId),

      technologyId:
        this.courseForm.technologyId ?? undefined,

      status:
        this.findOptionLabel(this.statuses, this.courseForm.statusId),

      statusId:
        this.courseForm.statusId ?? undefined,

      image:
        this.selectedImage || undefined

    };

    /*
     * Create new array reference
     * so Angular updates the UI.
     */
    this.courses = [
      ...this.courses
    ];

  }


  /* ================================
     CLOSE FORM
  ================================= */

  closeCourseForm(): void {

    this.showCourseForm = false;
    this.editMode = false;

    this.resetForm();

  }


  /* ================================
     RESET FORM
  ================================= */

  resetForm(): void {

    this.courseForm = {

      courseId: '',
      courseName: '',
      description: '',
      levelId: null,
      technologyId: null,
      statusId: this.statuses[0]?.value ?? null,
      createdAt: ''

    };

    this.selectedImage = null;

  }


  /* ================================
     IMAGE UPLOAD
  ================================= */

  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    /*
     * File type validation
     */

    const allowedTypes = [
      'image/png',
      'image/jpeg'
    ];

    if (!allowedTypes.includes(file.type)) {

      alert(
        'Only PNG and JPG images are allowed.'
      );

      input.value = '';

      return;
    }


    /*
     * Maximum 2MB
     */

    if (file.size > 2 * 1024 * 1024) {

      alert(
        'Maximum image size is 2MB.'
      );

      input.value = '';

      return;
    }


    /*
     * Preview
     */

    const reader = new FileReader();

    reader.onload = () => {

      this.selectedImage =
        reader.result as string;

    };

    reader.readAsDataURL(file);

  }


  /* ================================
     CLEAR FILTER
  ================================= */

  clearFilters(): void {

    this.searchText = '';
    this.selectedStatus = '';

  }


  /* ================================
     DATE FORMAT
  ================================= */

  private formatDate(date: Date): string {

    return date.toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }

}
interface CourseApiResponse {
  courseId: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  technologyId: number;
  levelId: number;
  statusId: number;
  level: string;
  status: string;
  durationHours: number | null;
  createdAt:string
}