import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-lms-home-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    InputTextModule
  ],
  templateUrl: './lms-home-layout.component.html',
  styleUrl: './lms-home-layout.component.scss'
})
export class LmsHomeLayoutComponent {
  sidebarOpen = false;
  openMenuId: string | null = 'courses';

  readonly menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home', routerLink: '/tutor/dashboard/dashboard' },
    { id: 'courses', label: 'Courses', icon: 'pi pi-book', items: [
      { id: 'course-list', label: 'Course List', icon: 'pi pi-list', routerLink: '/tutor/dashboard/courses' },
      { id: 'add-course', label: 'Add Course', icon: 'pi pi-plus-circle', routerLink: '/tutor/dashboard/courses/add' }
    ] },
    { id: 'modules', label: 'Modules', icon: 'pi pi-th-large', routerLink: '/tutor/dashboard/courses/modules' },
    { id: 'learning-content', label: 'Learning Content', icon: 'pi pi-video', routerLink: '/admin/content/videos' },
    { id: 'practice', label: 'Practice Exercises', icon: 'pi pi-code', routerLink: '/admin/practice' },
    { id: 'interview-questions', label: 'Interview Questions', icon: 'pi pi-question-circle', routerLink: '/admin/interview-questions' },
    { id: 'quizzes', label: 'Quiz Management', icon: 'pi pi-list-check', routerLink: '/admin/quizzes' },
    { id: 'publish', label: 'Publish / Manage', icon: 'pi pi-send', routerLink: '/admin/publish' },
    { id: 'reports', label: 'Reports', icon: 'pi pi-chart-bar', routerLink: '/admin/reports' },
    { id: 'users', label: 'Users', icon: 'pi pi-users', routerLink: '/admin/users' },
    { id: 'settings', label: 'Settings', icon: 'pi pi-cog', routerLink: '/admin/settings' }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleMenu(menuId: string): void {
    this.openMenuId = this.openMenuId === menuId ? null : menuId;
  }

}
