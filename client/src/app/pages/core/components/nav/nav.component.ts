import { Router } from '@angular/router';
import { IUser } from './../../../../interfaces/User';
import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() active: string;

  user: IUser;

  constructor(private authService: AuthService, public router: Router) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
