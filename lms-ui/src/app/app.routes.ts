import { Routes } from '@angular/router';

export const routes: Routes = [

    // Public
    {
        path: '',
        loadComponent: () =>  import('./features/landing/landing-page/landing-page.component') .then(m => m.LandingPageComponent)
      },
      

  {
    path: 'login',
    loadComponent: () => import('./features/admin/login/login.component').then(m => m.LoginComponent)
  }
  
    // {
    //   path: 'login',
    //  // component: LoginComponent
    // },
  
    // // Later protected routes
    // {
    //   path: 'learner',
    //   // authGuard
    // },
  
    // {
    //   path: 'tutor',
    //   // authGuard
    // },
  
    // {
    //   path: 'admin',
    //   // authGuard
    // }
  
  ];
