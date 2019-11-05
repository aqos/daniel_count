import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse';
import { HttpClient } from '@angular/common/http';
import {  handleError, CAR_CATEGORY_URL, DEPARTMENT_COUPLE_URL, WEATHER_URL, TIME_SLOT_URL,
          COUNT_URL,
          COUNT_CONFIG_URL
} from '../models/utils';
import { catchError } from 'rxjs/operators';
import { Count } from '../models/Count';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private http: HttpClient) { }

  getCarCategories(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(CAR_CATEGORY_URL)
      .pipe(
        catchError(handleError)
      );
  }

  getDepartmentCouples(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(DEPARTMENT_COUPLE_URL)
      .pipe(
        catchError(handleError)
      );
  }

  getCountConfigData(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(COUNT_CONFIG_URL)
      .pipe(
        catchError(handleError)
      );
  }

  getDepartmentCoupleRoads(departmentCoupleId: number) {
    return this.http.get<GenericResponse>(DEPARTMENT_COUPLE_URL + '/' + departmentCoupleId + '/roads')
      .pipe(
        catchError(handleError)
      );
  }

  getWeathers(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(WEATHER_URL)
      .pipe(
        catchError(handleError)
      );
  }

  getTimeSlots(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(TIME_SLOT_URL)
      .pipe(
        catchError(handleError)
      );
  }

  getCounts(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(COUNT_URL)
      .pipe(
        catchError(handleError)
      );
  }

  postCounts(data: Count[]): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(COUNT_URL, data)
      .pipe(
        catchError(handleError)
      );
  }
}
