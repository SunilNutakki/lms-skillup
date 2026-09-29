import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'lms_token';
  private readonly apiUrl = 'http://localhost:8081/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(param: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`,   param);

  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getMyProfile() {
    alert('444')
    return this.http.get('http://localhost:8081/api/users/me');
  }
}