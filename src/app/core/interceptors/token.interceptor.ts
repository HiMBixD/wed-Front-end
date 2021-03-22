import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getJwtToken()}`
        }
      });
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && (+error.status === 403 || +error.status === 401)) {
        return this.handle401Error(error);
      } else {
        return throwError(error);
      }
    }));
  }

  private handle401Error(error) {
    this.authService.clearJwtToken();
    this.router.navigate(['/login']);
    return throwError(error);
  }
}
