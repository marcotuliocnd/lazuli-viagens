import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService) {
    if (this.authService.isLogged()) {
      window.location.href = '/panel';
    }
  }

  canActivate() {
    return !this.authService.isLogged();
  }
}
