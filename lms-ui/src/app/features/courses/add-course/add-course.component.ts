import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { API_BASE_URL } from '../../../core/services/api.constants';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DropdownModule,
    CommonModule,
     FormsModule,
   InputTextModule,
   SelectModule
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})


export class AddCourseComponent implements OnInit {

  private readonly apiUrl = `${API_BASE_URL}/courses`;

  constructor(
    private router: Router,
    private readonly http: HttpClient, private messageService: MessageService,
  ) {}

  ngOnInit(): void {

    this.loadComboOptions();
  }

  submitted = false;

  courseForm: CourseForm = {
    courseCode:'',
    courseName: '',
    description: '',
    levelId: null,
    technologyId: null,
    statusId: null
  };
  selectedImage: File | null = null;
imageError = '';
saving = false;
saveError = '';
  levels:any = [];
  technologies:any = [];
  statuses:any = [];
  levelsLoading = false;
  technologiesLoading = false;
  statusesLoading = false;

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

  goBack(): void {
    this.router.navigate(['/tutor/dashboard/courses']);
  }

  saveCourse(): void {
    this.saving = true;
    this.saveError = '';

    const payload = {
      courseCode: this.courseForm.courseCode.trim(),
      courseName: this.courseForm.courseName.trim(),
      description: this.courseForm.description.trim(),
      technologyId: this.courseForm.technologyId!,
      levelId: this.courseForm.levelId!,
      statusId: this.courseForm.statusId!
    };

    this.http.post(`${this.apiUrl}`, payload).subscribe({
      next: response => {
        console.log('Course created:', response);
        this.saving = false;

          this.messageService.add({
    key: 'global',
    severity: 'success',
    summary: 'Success',
    detail: 'Course created successfully!',
    life: 3000
  });
        void this.router.navigate(['/tutor/dashboard/courses']);
      },
       error: error => {
    console.error('Create course failed:', error);

    this.saving = false;

    this.saveError =
      error.error?.message ?? 'Could not save the course. Please try again.';

    this.messageService.add({
        key: 'global',
      severity: 'error',
      summary: 'Course Creation Failed',
      detail: this.saveError,
      life: 5000
    });
  }
    });
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
  
    this.imageError = '';
    this.selectedImage = null;
  
    if (!file) {
      return;
    }
  }
}

interface CourseForm {
  courseName: string;
  description: string;
  levelId: number | null;
  technologyId: number | null;
  statusId: number | null;
  courseCode:String
}
