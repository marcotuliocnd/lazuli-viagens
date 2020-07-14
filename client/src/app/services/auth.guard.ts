import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
    if (!this.authService.isLogged()) {
      window.location.href = '/auth/login';
    }
  }

  canActivate() {
    return this.authService.isLogged();
  }
}
