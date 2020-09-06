import { IUser } from './interfaces/User';
import { Component } from '@angular/core';

import { AuthService } from './pages/auth/services/auth.service';

import { AuthService as Auth } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private authService: AuthService, private auth: Auth) {
    this.authService.auth().subscribe(
      (res) => {
        this.auth.setToken(res.token);
        this.auth.setUser(res.user as IUser);
      },
      (err) => {
        this.auth.logout();
        let message = '';
        if (err.status === 422) {
          for (const error of err.error.errors) {
            message += String(error.param)[0].toUpperCase() + String(error.param).slice(1);
            message += ', ';
          }

          message += 'inválidos!';
        } else {
          message = err.status === 400 ? 'E-mail ou senha não encontrados!' : 'Ocorreu um erro ao fazer login!';
        }

      }
    );
  }
}
