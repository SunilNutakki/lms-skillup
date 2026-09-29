import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface Statistic {
  icon: string;
  value: string;
  label: string;
}

interface PreviewCourse {
  icon: string;
  title: string;
  description: string;
  points: string[];
}

interface LearningRole {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonClass: string;
}

interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}


@Component({
  selector: 'app-landing-page',
  imports: [ CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    ButtonModule,
    InputTextModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  
  searchText = '';

  statistics: Statistic[] = [
    {
      icon: 'pi pi-users',
      value: '5,000+',
      label: 'Active Learners'
    },
    {
      icon: 'pi pi-play-circle',
      value: '200+',
      label: 'Learning Hours'
    },
    {
      icon: 'pi pi-book',
      value: '50+',
      label: 'Courses'
    },
    {
      icon: 'pi pi-star-fill',
      value: '90%',
      label: 'Learner Satisfaction'
    }
  ];

  previewCourses: PreviewCourse[] = [
    {
      icon: 'pi pi-code',
      title: 'Java Fundamentals',
      description: 'OOP concepts, collections and interview questions.',
      points: [
        'Quick Notes',
        '5 Interview Questions',
        '1 Coding Challenge'
      ]
    },
    {
      icon: 'pi pi-leaf',
      title: 'Spring Boot',
      description: 'Build REST APIs and microservices.',
      points: [
        'Architecture Guide',
        'Sample Project',
        'Best Practices'
      ]
    },
    {
      icon: 'pi pi-code',
      title: 'Angular',
      description: 'Learn components, services and API integration.',
      points: [
        'Component Basics',
        'Service & Routing',
        'Sample Project'
      ]
    },
    {
      icon: 'pi pi-database',
      title: 'SQL',
      description: 'Master queries with practical examples.',
      points: [
        'Joins Cheat Sheet',
        'Practice Questions',
        'Real Time Examples'
      ]
    },
    {
      icon: 'pi pi-sitemap',
      title: 'System Design',
      description: 'Learn HLD and LLD with real world examples.',
      points: [
        'URL Shortener (HLD)',
        'Design Patterns',
        'Scalability Concepts'
      ]
    },
    {
      icon: 'pi pi-bullseye',
      title: 'Interview Prep',
      description: 'Daily questions for Java Full Stack.',
      points: [
        'Topic Wise Questions',
        'Answers & Explanation',
        'Practice Quizzes'
      ]
    }
  ];

  learningRoles: LearningRole[] = [
    {
      icon: 'pi pi-graduation-cap',
      title: 'Learner (Student)',
      description:
        'Access courses, learn at your own pace, take quizzes and earn certificates.',
      buttonText: 'Start Learning',
      buttonClass: 'learner-btn'
    },
    {
      icon: 'pi pi-user',
      title: 'Tutor (Instructor)',
      description:
        'Create and manage courses, upload content and track learner progress.',
      buttonText: 'Start Teaching',
      buttonClass: 'tutor-btn'
    },
    {
      icon: 'pi pi-cog',
      title: 'Admin (Organization)',
      description:
        'Manage users, courses, enrollments and monitor platform activity.',
      buttonText: 'Explore Admin',
      buttonClass: 'admin-btn'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Rahul K',
      role: 'Software Developer',
      message:
        'Great platform to learn Java and Spring Boot. The practical examples are really helpful!',
      avatar: 'RK'
    },
    {
      name: 'Priya S',
      role: 'Full Stack Learner',
      message:
        'The courses are well structured and easy to follow. I loved the hands-on projects!',
      avatar: 'PS'
    },
    {
      name: 'Vikram M',
      role: 'Working Professional',
      message:
        'Excellent content and interview preparation material. Highly recommended!',
      avatar: 'VM'
    }
  ];

  challengeOptions: string[] = [
    'true',
    'false',
    'Compilation error',
    'Runtime error'
  ];

  selectedAnswer = '';

  checkAnswer(): void {
    if (this.selectedAnswer === 'true') {
      alert('Correct Answer! The output is true.');
    } else {
      alert('Try again. The correct answer is: true');
    }
  }

  exploreCourses(): void {
    console.log('Explore Free Lessons clicked');
  }

  watchIntro(): void {
    console.log('Watch Intro clicked');
  }


}
