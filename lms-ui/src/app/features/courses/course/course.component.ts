import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

interface Course {
  courseId: string;
  courseName: string;
  description: string;
  level: string;
  technology: string;
  status: string;
  createdDate: string;
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
    InputTextModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CoursesComponent {

  /* ================================
     PAGE STATE
  ================================= */

  searchText = '';
  selectedStatus = 'All Status';

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
    level: '',
    technology: '',
    status: 'Draft',
    createdDate: ''
  };


  /* ================================
     MASTER DATA
  ================================= */

  levels: string[] = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  technologies: string[] = [
    'Java',
    'Spring Boot',
    'Angular',
    'Python',
    'SQL',
    'JavaScript',
    'Microservices'
  ];

  statuses: string[] = [
    'Published',
    'Draft'
  ];


  /* ================================
     MOCK COURSE DATA
     Replace with API later
  ================================= */

  courses: Course[] = [
    {
      courseId: 'CRS001',
      courseName: 'Java Full Stack',
      description: 'Complete Java full stack development course.',
      level: 'Beginner',
      technology: 'Java',
      status: 'Published',
      createdDate: '10 Jan 2024'
    },
    {
      courseId: 'CRS002',
      courseName: 'Spring Boot',
      description: 'Learn Spring Boot and REST API development.',
      level: 'Intermediate',
      technology: 'Spring Boot',
      status: 'Published',
      createdDate: '12 Jan 2024'
    },
    {
      courseId: 'CRS003',
      courseName: 'Angular Fundamentals',
      description: 'Learn Angular from fundamentals to advanced concepts.',
      level: 'Beginner',
      technology: 'Angular',
      status: 'Draft',
      createdDate: '15 Jan 2024'
    },
    {
      courseId: 'CRS004',
      courseName: 'Python Programming',
      description: 'Python programming fundamentals and practice.',
      level: 'Beginner',
      technology: 'Python',
      status: 'Published',
      createdDate: '18 Jan 2024'
    },
    {
      courseId: 'CRS005',
      courseName: 'SQL for Beginners',
      description: 'Learn SQL and database fundamentals.',
      level: 'Beginner',
      technology: 'SQL',
      status: 'Draft',
      createdDate: '20 Jan 2024'
    }
  ];


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
        this.selectedStatus === 'All Status' ||
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
      level: course.level,
      technology: course.technology,
      status: course.status,
      createdDate: course.createdDate
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

    if (!this.courseForm.level) {

      alert('Please select level.');

      return false;
    }

    if (!this.courseForm.technology) {

      alert('Please select technology.');

      return false;
    }

    if (!this.courseForm.status) {

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
        this.courseForm.level,

      technology:
        this.courseForm.technology,

      status:
        this.courseForm.status,

      createdDate:
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
        this.courseForm.level,

      technology:
        this.courseForm.technology,

      status:
        this.courseForm.status,

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
      level: '',
      technology: '',
      status: 'Draft',
      createdDate: ''

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
    this.selectedStatus = 'All Status';

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