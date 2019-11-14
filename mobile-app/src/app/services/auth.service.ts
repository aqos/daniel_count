import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse';
import { Register } from '../models/Register';
import { REGISTER_URL, handleError, LOGIN_URL, LOGOUT_URL, GET_AUTHENTICATED_USER_URL } from '../models/utils';
import { catchError } from 'rxjs/operators';
import { Login } from '../models/LoginData';
import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public isAuth(): boolean {
    return this.getToken() !== null && !this.isTokenExpired(this.getToken().expires_at);
  }

  isTokenExpired(timestamp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) > timestamp;
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('access_token')) as Token;
  }

  setToken(token: Token) {
    localStorage.setItem('access_token', JSON.stringify(token));
  }

  getAuthorization(): string {
    return `${this.getToken().token_type} ${this.getToken().access_token}`;
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

  logout(): Observable<GenericResponse> {
      return this.http.get<GenericResponse>(LOGOUT_URL)
        .pipe(
          catchError(handleError)
        );
  }

  user(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(GET_AUTHENTICATED_USER_URL)
      .pipe(
        catchError(handleError)
      );
  }
}
