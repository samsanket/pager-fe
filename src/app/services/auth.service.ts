import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, loginData);
  }
}
