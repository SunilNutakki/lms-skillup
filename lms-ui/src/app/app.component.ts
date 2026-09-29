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
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'lms-ui';

  
}