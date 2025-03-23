import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [['ROLE_ADMIN']] 

    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Account created successfully!';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 2000); 
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Something went wrong!';
          this.successMessage = '';
        }
      });
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
