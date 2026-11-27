
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ModuleService } from '../../../core/services/module.service';
import { CommonService } from '../../../core/services/common.service';
import { Subscription } from 'rxjs';

/* =========================================================
   INTERFACES
========================================================= */

interface Course {
  courseId: string;
  courseName: string;
  description: string;
  level: string;
  technology: string;
  status: 'Published' | 'Draft';
  createdDate: string;
  image?: string;
}

interface CourseModule {
  moduleId: string;
  courseId: string;
  moduleName: string;
  description: string;
  displayOrder: number;
  status: 'Published' | 'Draft';
}

interface ModuleForm {
  moduleId: string;
  courseId: string;
  moduleName: string;
  description: string;
  displayOrder: number;
  status: string;
}

/* =========================================================
   COMPONENT
========================================================= */

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    RouterOutlet,
    SelectModule 
  ],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent  implements OnInit ,OnDestroy   {
  courses:any=[]
  loadingModules: boolean=false;
  private refreshSubscription?: Subscription;
  constructor(private router: Router,
    private route: ActivatedRoute,private apiService: ModuleService,private commonService: CommonService) {}

      ngOnInit(): void {
    this.loadCourses();
    this.getRefreshAction();
  }

  isModalOpen = false;
  dynamicModalName = '';
  dynamicModalSize = '600px';

  private readonly modalSizes: Record<string, string> = {
    sm: '400px',
    md: '600px',
    lg: '850px',
    xl: '1100px',
    full: '95vw'
  };

  getRefreshAction(){

  // Listen for popup refresh
  this.refreshSubscription = this.commonService
    .onRefresh()
    .subscribe(() => {

      const data = this.commonService.getObject();
      if (!data) {
        return;
      }
        if(data.transactionName==='SAVE_MODULE'){
          this.selectedCourseId = data.courseId;
          this.loadModulesByCourse(data.courseId);
        }

          this.commonService.clearObject();

    });
  }
  ngOnDestroy(): void {
  this.refreshSubscription?.unsubscribe();
}

  /* =======================================================
     COURSES

     Sample data for UI development.
     Replace with the Course API when integrating backend.
  ======================================================= */


  /* =======================================================
     MODULE DATA

     Each module is linked to a courseId.
     Replace with API data after backend integration.
  ======================================================= */

  modules: CourseModule[] = [
    // Core Java
    {
      moduleId: 'MOD001',
      courseId: 'CRS001',
      moduleName: 'Introduction to Java',
      description: 'Overview of Java, history, JVM and JDK',
      displayOrder: 1,
      status: 'Published'
    },
    {
      moduleId: 'MOD002',
      courseId: 'CRS001',
      moduleName: 'Java Basics',
      description: 'Variables, data types and operators',
      displayOrder: 2,
      status: 'Published'
    },
    {
      moduleId: 'MOD003',
      courseId: 'CRS001',
      moduleName: 'OOP Concepts',
      description: 'Classes, objects, inheritance and polymorphism',
      displayOrder: 3,
      status: 'Published'
    },
    {
      moduleId: 'MOD004',
      courseId: 'CRS001',
      moduleName: 'Collections Framework',
      description: 'List, Set, Map and Queue',
      displayOrder: 4,
      status: 'Draft'
    },
    {
      moduleId: 'MOD005',
      courseId: 'CRS001',
      moduleName: 'Exception Handling',
      description: 'Try, catch, finally and custom exceptions',
      displayOrder: 5,
      status: 'Published'
    },

    // Spring Boot
    {
      moduleId: 'MOD006',
      courseId: 'CRS002',
      moduleName: 'Spring Boot Introduction',
      description: 'Spring Boot architecture, starters and auto-configuration',
      displayOrder: 1,
      status: 'Published'
    },
    {
      moduleId: 'MOD007',
      courseId: 'CRS002',
      moduleName: 'REST API Development',
      description: 'Controllers, request mappings and REST responses',
      displayOrder: 2,
      status: 'Published'
    },
    {
      moduleId: 'MOD008',
      courseId: 'CRS002',
      moduleName: 'Spring Data JPA',
      description: 'Repositories, entities and database operations',
      displayOrder: 3,
      status: 'Published'
    },
    {
      moduleId: 'MOD009',
      courseId: 'CRS002',
      moduleName: 'Spring Security',
      description: 'Authentication, authorization and API security',
      displayOrder: 4,
      status: 'Draft'
    },

    // Angular
    {
      moduleId: 'MOD010',
      courseId: 'CRS003',
      moduleName: 'Angular Fundamentals',
      description: 'Components, templates and data binding',
      displayOrder: 1,
      status: 'Published'
    },
    {
      moduleId: 'MOD011',
      courseId: 'CRS003',
      moduleName: 'Angular Routing',
      description: 'Routes, navigation and route guards',
      displayOrder: 2,
      status: 'Published'
    }
  ];

  /* =======================================================
     COURSE SELECTION
  ======================================================= */

  selectedCourseId :any;

  get selectedCourse(): Course | undefined {
    return this.courses.find(
     ( course:any) => course.courseId === this.selectedCourseId
    );
  }

  get courseModules(): CourseModule[] {
    return this.modules
      .filter(module => module.courseId === this.selectedCourseId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  onCourseChange(courseId: any): void {
    this.selectedCourseId = courseId;

    // Clear filters when switching courses.
    this.clearFilters();

    // Close and reset the form when switching courses.
    this.resetModuleForm();
    if (courseId) {
    this.loadModulesByCourse(courseId);
  } else {
    this.modules = [];
  }
  }

  /* =======================================================
     SEARCH AND STATUS FILTERS
  ======================================================= */

  searchText = '';
  selectedStatus = '';

  get filteredModules(): CourseModule[] {
    const search = this.searchText.trim().toLowerCase();

    return this.courseModules.filter(module => {
      const matchesSearch =
        !search ||
        module.moduleName.toLowerCase().includes(search) ||
        module.description.toLowerCase().includes(search) ||
        module.moduleId.toLowerCase().includes(search);

      const matchesStatus =
        !this.selectedStatus ||
        module.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = '';
  }

  /* =======================================================
     ADD / EDIT FORM
  ======================================================= */

  showModuleForm = false;
  editMode = false;
  submitted = false;

  moduleForm: ModuleForm = this.createEmptyForm();

  private createEmptyForm(): ModuleForm {
    return {
      moduleId: '',
      courseId: this.selectedCourseId,
      moduleName: '',
      description: '',
      displayOrder: this.getNextDisplayOrder(),
      status: ''
    };
  }

  private getNextDisplayOrder(): number {
    const courseModules = this.modules.filter(
      module => module.courseId === this.selectedCourseId
    );

    if (courseModules.length === 0) {
      return 1;
    }

    return Math.max(
      ...courseModules.map(module => module.displayOrder)
    ) + 1;
  }

  openAddModule(): void {
    if (!this.selectedCourse) {
      window.alert('Please select a course first.');
      return;
    }

    this.editMode = false;
    this.submitted = false;
    this.moduleForm = this.createEmptyForm();
    this.moduleForm.courseId = this.selectedCourseId;
    this.showModuleForm = true;
  }

  editModule(module: CourseModule): void {
    this.editMode = true;
    this.submitted = false;
    this.showModuleForm = true;

    this.moduleForm = {
      moduleId: module.moduleId,
      courseId: module.courseId,
      moduleName: module.moduleName,
      description: module.description,
      displayOrder: module.displayOrder,
      status: module.status
    };
  }

  /* =======================================================
     VIEW MODULE
  ======================================================= */

  viewModule(module: CourseModule): void {
    this.router.navigate([
      '/tutor/dashboard/courses/modules',
      module.moduleId,
      'content'
    ], {
      queryParams: { courseId: module.courseId }
    });
  }

  /* =======================================================
     SAVE MODULE

     Currently saves to the local sample array.
     Replace with POST/PUT API calls for MySQL persistence.
  ======================================================= */

  saveModule(): void {
    this.submitted = true;

    if (
      !this.moduleForm.courseId ||
      !this.moduleForm.moduleName.trim() ||
      !this.moduleForm.description.trim() ||
      !this.moduleForm.status ||
      !Number.isInteger(Number(this.moduleForm.displayOrder)) ||
      Number(this.moduleForm.displayOrder) < 1
    ) {
      return;
    }

    const courseExists = this.courses.some(
      (course:any) => course.courseId === this.moduleForm.courseId
    );

    if (!courseExists) {
      window.alert('Please select a valid course.');
      return;
    }

    const duplicateOrder = this.modules.some(module =>
      module.courseId === this.moduleForm.courseId &&
      module.displayOrder === Number(this.moduleForm.displayOrder) &&
      module.moduleId !== this.moduleForm.moduleId
    );

    if (duplicateOrder) {
      window.alert(
        'This display order is already used by another module in the selected course.'
      );
      return;
    }

    const duplicateName = this.modules.some(module =>
      module.courseId === this.moduleForm.courseId &&
      module.moduleName.trim().toLowerCase() ===
        this.moduleForm.moduleName.trim().toLowerCase() &&
      module.moduleId !== this.moduleForm.moduleId
    );

    if (duplicateName) {
      window.alert(
        'A module with this name already exists in the selected course.'
      );
      return;
    }

    if (this.editMode) {
      const index = this.modules.findIndex(
        module => module.moduleId === this.moduleForm.moduleId
      );

      if (index === -1) {
        window.alert('Module not found.');
        return;
      }

      this.modules[index] = {
        ...this.moduleForm,
        displayOrder: Number(this.moduleForm.displayOrder),
        status: this.moduleForm.status as 'Published' | 'Draft'
      };

    } else {
      const newModule: CourseModule = {
        ...this.moduleForm,
        moduleId: this.generateModuleId(),
        displayOrder: Number(this.moduleForm.displayOrder),
        status: this.moduleForm.status as 'Published' | 'Draft'
      };

      this.modules = [...this.modules, newModule];
    }

    // Show modules for the course that was saved.
    this.selectedCourseId = this.moduleForm.courseId;

    this.clearFilters();
    this.resetModuleForm();

    window.alert(
      this.editMode
        ? 'Module updated successfully.'
        : 'Module saved successfully.'
    );
  }

  /* =======================================================
     DELETE MODULE
  ======================================================= */

  deleteModule(module: CourseModule): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${module.moduleName}"?`
    );

    if (!confirmed) {
      return;
    }

    this.modules = this.modules.filter(
      item => item.moduleId !== module.moduleId
    );

    // If the deleted module was open for editing, close the form.
    if (this.moduleForm.moduleId === module.moduleId) {
      this.resetModuleForm();
    }
  }

  /* =======================================================
     RESET / CLOSE FORM
  ======================================================= */

  resetModuleForm(): void {
    this.showModuleForm = false;
    this.editMode = false;
    this.submitted = false;
    this.moduleForm = this.createEmptyForm();
  }

  /* =======================================================
     NAVIGATION
  ======================================================= */

  goBackToCourses(): void {
    this.router.navigate(['/tutor/dashboard/courses']);
  }

  /* =======================================================
     ID GENERATION FOR MOCK DATA ONLY
  ======================================================= */

  private generateModuleId(): string {
    let nextId = this.modules.length + 1;
    let id = `MOD${String(nextId).padStart(3, '0')}`;

    while (this.modules.some(module => module.moduleId === id)) {
      nextId++;
      id = `MOD${String(nextId).padStart(3, '0')}`;
    }

    return id;
  }



  openDynamicModal(
    modalName: string,
    modalPath: string,
    size: string = 'md',
    queryParams: Record<string, any> = {}
  ): void {

    this.dynamicModalName = modalName;
    this.dynamicModalSize =
      this.modalSizes[size] ?? this.modalSizes['lg'];

    this.isModalOpen = true;

    void this.router.navigate(
      [
        {
          outlets: {
            modal: [modalPath]
          }
        }
      ],
      {
        relativeTo: this.route,
        queryParams
      }
    ).then(success => {
      this.isModalOpen = success || this.hasActiveModalRoute();
    }, () => {
      this.isModalOpen = this.hasActiveModalRoute();
    });
  }

  /**
   * Common method for closing any dynamic modal.
   */
  closeDynamicModal(): void {
    this.isModalOpen = false;

    if (this.hasActiveModalRoute()) {
      void this.router.navigate(
        [{ outlets: { modal: null } }],
        {
          relativeTo: this.route,
          queryParams: {}
        }
      );
    }
  }

  onModalActivate(): void {
    this.isModalOpen = true;
  }

  onModalDeactivate(): void {
    this.isModalOpen = false;
  }

  onModalHide(): void {
    this.closeDynamicModal();
  }

  private hasActiveModalRoute(): boolean {
    return this.route.children.some(child => child.outlet === 'modal');
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

 loadModulesByCourse(courseId: string): void {

  this.loadingModules = true;

  this.apiService.getModulesByCourse(courseId).subscribe({

    next: (response: any) => {

      this.modules = response;

      this.loadingModules = false;

      console.log('Course modules:', response);
    },

    error: (error) => {

      console.error('Failed to load modules:', error);

      this.modules = [];

      this.loadingModules = false;
    }

  });
}

onMainCourseChange(courseId: any): void {

  console.log('Main Course Changed:', courseId);

  this.selectedCourseId = courseId;

  this.clearFilters();

  if (courseId) {
    this.loadModulesByCourse(courseId);
  } else {
    this.modules = [];
  }
}
}
