import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse';
import { Register } from '../models/Register';
import { REGISTER_URL, handleError, LOGIN_URL, LOGOUT_URL, GET_AUTHENTICATED_USER_URL, getItemFromLocalStorage, setItemInLocalStorage, isValidToken } from '../models/utils';
import { catchError } from 'rxjs/operators';
import { Login } from '../models/LoginData';
import { Token } from '../models/Token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  getIsAuth() {
    return isValidToken();
  }

  register(data: Register): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(REGISTER_URL, data)
      .pipe(
        catchError(handleError)
      );
  }

  login(data: Login): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(LOGIN_URL, data)
      .pipe(
        catchError(handleError)
      );
  }

  logout(): Observable<GenericResponse> | number {
    const token = getItemFromLocalStorage('token') as Token;
    if (token !== null) {
      return this.http.get<GenericResponse>(LOGOUT_URL)
        .pipe(
          catchError(handleError)
        );
    }
    return -1;
  }

  user(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(GET_AUTHENTICATED_USER_URL)
      .pipe(
        catchError(handleError)
      );
  }
}
