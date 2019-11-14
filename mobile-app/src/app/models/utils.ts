import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { isNull } from 'util';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

export const BASE_URL = 'http://localhost:8000/api';
export const LOGIN_URL = BASE_URL + '/auth/login';
export const REGISTER_URL = BASE_URL + '/auth/register';
export const REFRESH_TOKEN_URL = BASE_URL + '/auth/refresh-token';
export const LOGOUT_URL = BASE_URL + '/auth/logout';
export const GET_AUTHENTICATED_USER_URL = BASE_URL + '/auth/user';
export const CAR_CATEGORY_URL = BASE_URL + '/car-category';
export const WEATHER_URL = BASE_URL + 'weather';
export const TIME_SLOT_URL = BASE_URL + '/time-slot';
export const DEPARTMENT_COUPLE_URL = BASE_URL + '/department-couple';
export const COUNT_URL = BASE_URL + '/count';
export const COUNT_CONFIG_URL = BASE_URL + '/count-config';
// export const _URL = BASE_URL + '';

export function handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        'Something bad happened; please try again later.');
}

export function encryptData(data) {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), environment.encryptSecretKey).toString();
    } catch (e) {
        console.log(e);
    }
}

export function decryptData(data) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, environment.encryptSecretKey);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
    } catch (e) {
        console.log(e);
    }
}

@Injectable({
    providedIn: 'root'
})
export class NotificationTools {

    constructor(
        private loadingController: LoadingController,
        private alertController: AlertController
    ) { }

    createLoading(msg: string) {
        return this.loadingController.create({
            message: msg,
        });
    }

    createAlert(head: string, msg: string) {
        return this.alertController.create({
            header: head,
            message: msg,
            buttons: ['OK']
        });
    }
}
