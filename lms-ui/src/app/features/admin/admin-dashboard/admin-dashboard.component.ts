import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  // Static dashboard view models. Replace these arrays with API responses later.
  readonly stats = [
    { label: 'Total Courses', value: '5', change: '+12%', icon: 'pi pi-book', tone: 'purple' },
    { label: 'Total Learners', value: '1,245', change: '+18%', icon: 'pi pi-users', tone: 'green' },
    { label: 'Active Learners', value: '980', change: '+15%', icon: 'pi pi-graduation-cap', tone: 'blue' },
    { label: 'Total Content', value: '42', change: '+22%', icon: 'pi pi-file', tone: 'orange' }
  ];

  readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  readonly categories = [
    { name: 'Java', count: 1, percent: '20%', color: '#2580f7' },
    { name: 'Spring Boot', count: 1, percent: '20%', color: '#42cf91' },
    { name: 'Angular', count: 1, percent: '20%', color: '#ffb843' },
    { name: 'Python', count: 1, percent: '20%', color: '#cf9af7' },
    { name: 'SQL', count: 1, percent: '20%', color: '#4466ff' }
  ];

  readonly recentCourses = [
    { name: 'Java Full Stack', level: 'Beginner', date: '10 Jan 2024' },
    { name: 'Spring Boot', level: 'Intermediate', date: '12 Jan 2024' },
    { name: 'Angular Fundamentals', level: 'Beginner', date: '15 Jan 2024' },
    { name: 'Python Programming', level: 'Beginner', date: '18 Jan 2024' },
    { name: 'SQL for Beginners', level: 'Beginner', date: '20 Jan 2024' }
  ];

  readonly recentLearners = [
    { initials: 'RS', name: 'Rahul Sharma', course: 'Java Full Stack', date: '15 Oct 2026', tone: 'purple' },
    { initials: 'AP', name: 'Anjali Patel', course: 'Spring Boot', date: '14 Oct 2026', tone: 'blue' },
    { initials: 'VK', name: 'Vikram Kumar', course: 'Angular Fundamentals', date: '13 Oct 2026', tone: 'green' },
    { initials: 'SP', name: 'Sneha P', course: 'Python Programming', date: '12 Oct 2026', tone: 'orange' },
    { initials: 'NK', name: 'Neha Kumar', course: 'SQL for Beginners', date: '11 Oct 2026', tone: 'red' }
  ];

  readonly recentActivities = [
    { icon: 'pi pi-plus', title: 'New course created', detail: 'Java Full Stack', when: '2 hours ago', tone: 'green' },
    { icon: 'pi pi-user', title: 'New learner registered', detail: 'Rahul Sharma', when: '3 hours ago', tone: 'teal' },
    { icon: 'pi pi-file-edit', title: 'Content updated', detail: 'Spring Boot - Module 1', when: '5 hours ago', tone: 'purple' },
    { icon: 'pi pi-send', title: 'Course published', detail: 'Angular Fundamentals', when: '1 day ago', tone: 'orange' },
    { icon: 'pi pi-cog', title: 'Settings updated', detail: 'Platform configuration', when: '1 day ago', tone: 'red' }
  ];

}
