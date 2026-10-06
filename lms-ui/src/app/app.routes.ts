import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';


export const routes: Routes = [

    // Public
    {
        path: '',
        loadComponent: () =>  import('./features/landing/landing-page/landing-page.component') .then(m => m.LandingPageComponent)
      },
      

  {
    path: 'login',
    loadComponent: () => import('./features/admin/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'tutor/dashboard',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./layout/lms-home-layout/lms-home-layout.component')
        .then(m => m.LmsHomeLayoutComponent),

    children: [

      // -------------------------------------------------------
      // Dashboard
      // /admin/dashboard
      // -------------------------------------------------------

      // {
      //   path: 'dashboard',
      //   loadComponent: () =>
      //     import('./features/admin/admin-dashboard/admin-dashboard.component')
      //       .then(m => m.AdminDashboardComponent)
      // },


      // =======================================================
      // PHASE 1 - COURSE MANAGEMENT
      // /admin/courses
      // =======================================================

      {
        path: 'courses',
        children: [

          {
            path: '',
            loadComponent: () =>
              import('./features/courses/course/course.component')
                .then(m => m.CoursesComponent)
          },

          {
            path: 'add',
            loadComponent: () =>
              import('./features/courses/course/course.component')
                .then(m => m.CoursesComponent)
          }

        ]
      },


      // // =======================================================
      // // PHASE 2 - MODULE MANAGEMENT
      // // /admin/modules
      // // =======================================================

      // {
      //   path: 'modules',
      //   loadComponent: () =>
      //     import('./features/admin/modules/module-management/module-management.component')
      //       .then(m => m.ModuleManagementComponent)
      // },


      // // =======================================================
      // // PHASE 3 - CONTENT MANAGEMENT
      // // /admin/content
      // // =======================================================

      // {
      //   path: 'content',
      //   loadComponent: () =>
      //     import('./features/admin/content/content-management/content-management.component')
      //       .then(m => m.ContentManagementComponent)
      // },


      // // =======================================================
      // // PHASE 4 - PRACTICE
      // // /admin/practice
      // // =======================================================

      // {
      //   path: 'practice',
      //   loadComponent: () =>
      //     import('./features/admin/practice/practice-management/practice-management.component')
      //       .then(m => m.PracticeManagementComponent)
      // },


      // // =======================================================
      // // PHASE 5 - PUBLISH / MANAGE
      // // /admin/publish
      // // =======================================================

      // {
      //   path: 'publish',
      //   loadComponent: () =>
      //     import('./features/admin/publish/publish-management/publish-management.component')
      //       .then(m => m.PublishManagementComponent)
      // },


      // // =======================================================
      // // PHASE 6 - LEARNER
      // // /admin/learner-preview
      // // =======================================================

      // {
      //   path: 'learner-preview',
      //   loadComponent: () =>
      //     import('./features/admin/learner-preview/learner-preview.component')
      //       .then(m => m.LearnerPreviewComponent)
      // }

    ]
  },


  // =========================================================
  // DEFAULT / UNKNOWN
  // =========================================================

  {
    path: '**',
    redirectTo: 'admin/dashboard'
  }


  
  ];
