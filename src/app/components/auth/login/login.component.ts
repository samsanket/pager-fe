import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.cookieService.set('accessToken', response.accessToken);
          this.cookieService.set('username', response.username);
          this.cookieService.set('role', JSON.stringify(response.roles));
          alert('Login successful!');
          this.router.navigate(['/']); 
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Invalid credentials!';
        }
      });
    }
  }
}
