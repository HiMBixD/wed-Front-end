import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.url}/auth`, user)
      .pipe(
        tap(token => {
          localStorage.setItem(this.JWT_TOKEN, token.data);
        }),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  resetPass(payload): Observable<any> {
    return this.http.post(`${environment.url}/reset-password`, payload);
  }

  logOut(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): any {
    return !!this.getJwtToken();
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  clearJwtToken(): any {
    return localStorage.removeItem(this.JWT_TOKEN);
  }
}
