
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ModuleService } from '../../../core/services/module.service';
import { CommonService } from '../../../core/services/common.service';
import { MessageService } from 'primeng/api';

export interface ModuleCourseOption {
  courseId: string;
  courseName: string;
}

export interface ModuleFormData {
  moduleId?: string;
  courseId: string;
  moduleName: string;
  description: string;
  displayOrder: number;
  status: 'Draft' | 'Published' | '';
}

@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './add-modules.component.html',
  styleUrl: './add-modules.component.scss'
})
export class AddModulesComponent implements OnInit, OnDestroy {

  courses: ModuleCourseOption[] = [];

  selectedCourseId = '';
  nextDisplayOrder = 1;
  initialModule: ModuleFormData | null = null;
  editMode = false;
  submitted = false;

  statusOptions = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Published', value: 'Published' }
  ];

  moduleForm: ModuleFormData = this.createEmptyForm();

  private queryParamsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,private apiService:ModuleService,private commonService: CommonService,private messageService: MessageService
  ) {}

 ngOnInit(): void {

  this.loadCourses();

  this.queryParamsSubscription =
    this.route.queryParamMap.subscribe(params => {

      this.selectedCourseId = params.get('courseId') ?? '';
      this.editMode = params.get('mode') === 'edit';

      const order = Number(params.get('nextDisplayOrder'));

      this.nextDisplayOrder =
        Number.isInteger(order) && order > 0 ? order : 1;

      const moduleId = params.get('moduleId');

      if (this.editMode && moduleId) {

        this.apiService.getModuleById(moduleId).subscribe({
          next: (response: any) => {
            this.initialModule = response;
            this.moduleForm = { ...response };
          },
          error: (error) => console.error(error)
        });

      } else {

        this.initialModule = null;
        this.resetForm();

      }

    });
}

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  private createEmptyForm(): ModuleFormData {
    return {
      courseId: this.selectedCourseId,
      moduleName: '',
      description: '',
      displayOrder: this.nextDisplayOrder || 1,
      status: ''
    };
  }

  get invalidDisplayOrder(): boolean {
    const order = this.moduleForm.displayOrder;

    return (
      order === null ||
      order === undefined ||
      !Number.isInteger(Number(order)) ||
      Number(order) < 1
    );
  }

  saveModule(): void {

  this.submitted = true;

  if (
    !this.moduleForm.courseId ||
    !this.moduleForm.moduleName?.trim() ||
    !this.moduleForm.description?.trim() ||
    !this.moduleForm.status ||
    this.invalidDisplayOrder
  ) {
    return;
  }

  const payload = {
    courseId: this.moduleForm.courseId,
    moduleName: this.moduleForm.moduleName.trim(),
    description: this.moduleForm.description.trim(),
    sequenceNo: Number(this.moduleForm.displayOrder),
    status: this.moduleForm.status
  };

  if (this.editMode && this.moduleForm.moduleId) {

    // Update Module
    this.apiService.updateModule(
      this.moduleForm.moduleId,
      payload
    ).subscribe({
      next: (response: any) => {
        console.log('Module updated:', response);
             this.messageService.add({
    key: 'global',
    severity: 'success',
    summary: 'Success',
    detail: 'Course created successfully!',
    life: 3000
  });

      // Store transaction details
      this.commonService.setObject({
        transactionName: 'SAVE_MODULE',
        courseId: payload.courseId,
        response: response
      });

      // Notify parent component
      this.commonService.refresh();
        this.closeDynamicModal();
      },
      error: (error) => {
        console.error('Module update failed:', error);
      }
    });

  } else {

    // Create Module
    this.apiService.createModule(payload).subscribe({
      next: (response: any) => {
        console.log('Module created:', response);
        this.commonService.setObject({
          transactionName: 'SAVE_MODULE',
          courseId: payload.courseId,
          response
        });
        this.commonService.refresh();
        this.closeDynamicModal();
      },
      error: (error) => {
        console.error('Module creation failed:', error);
      }
    });

  }
}

  resetForm(): void {
    this.submitted = false;

    if (this.editMode && this.initialModule) {
      this.moduleForm = { ...this.initialModule };
      return;
    }

    this.moduleForm = this.createEmptyForm();
  }

  cancelForm(): void {
    this.closeDynamicModal();
  }

  goBack(): void {
    this.closeDynamicModal();
  }

  private closeDynamicModal(): void {
    const parentRoute = this.route.parent;
    if (!parentRoute) {
      return;
    }

    void this.router.navigate(
      [{ outlets: { modal: null } }],
      {
        relativeTo: parentRoute,
        queryParams: {}
      }
    );
  }
      loadCourses(): void {
    this.apiService.getCourses().subscribe({
      next: (response: any) => {
        this.courses = response;
        console.log('Courses:', this.courses);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  
  
}
