import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loading = false;
  showPassword = false;

  loginForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,private authService: AuthService
  ) {

    // Initialize form after FormBuilder is available
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      rememberMe: [false]
    });

  }


  // =====================================================
  // FORM CONTROLS
  // =====================================================

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  // =====================================================
  // LOGIN
  // =====================================================

  onLogin(): void {

    if (this.loginForm.invalid) {
  
      this.loginForm.markAllAsTouched();
  
      return;
    }
  
    this.loading = true;
  
    console.log('Form value:', this.loginForm.value);

    const request = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    };
    
    console.log('Request:', request);
    this.authService.login(request).subscribe({
  
      next: (response) => {
        console.log('Login Response:', response);

        if (response.success && response.token) {
      
          this.authService.setToken(response.token);
          
      
          console.log('JWT Token stored');
          this.authService.getMyProfile().subscribe({
            next: (response) => {
              console.log('My Profile:', response);
            },
            error: (error) => {
              console.error('Profile API Error:', error);
            }
          });
          
      
        }
      
        this.loading = false;
  
      },
  
      error: (error) => {
  
        console.error('Login error:', error);
  
        this.loading = false;
  
      }
  
    });
  
  }


  // =====================================================
  // PASSWORD VISIBILITY
  // =====================================================

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }


  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  forgotPassword(): void {

    console.log('Forgot password clicked');

  }


  // =====================================================
  // REGISTER
  // =====================================================

  register(): void {

    console.log('Register clicked');

  }


  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  continueWithGoogle(): void {

    console.log('Google login clicked');

  }


  // =====================================================
  // BACK TO HOME
  // =====================================================

  goHome(): void {

    this.router.navigate(['/']);

  }

}