import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'signup' }
];
