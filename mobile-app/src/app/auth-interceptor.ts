import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    if (this.authService.isAuth()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getAuthorization(),
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse, caught) => {
        if (error && error.status === 401) {
          this.authService.setToken(null);
          // return an observable with a user-facing error message
          return throwError('Votre session est expirée, veuillez vous reconnecter svp !');
        }
      })
    );
  }
}
