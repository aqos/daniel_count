import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {
    // localStorage.setItem('access_token', JSON.stringify(null));
    if (!this.authService.isAuth()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
