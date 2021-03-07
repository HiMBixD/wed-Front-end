import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrlLocal}/auth`, user)
      .pipe(
        tap(token => {
          localStorage.setItem(this.JWT_TOKEN, token.data);
        }),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logOut() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  clearJwtToken() {
    return localStorage.removeItem(this.JWT_TOKEN);
  }
}
