import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthService as Auth} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private auth: Auth,
  ) {
    this.formGroup = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.formGroup.value).subscribe(
      (res) => {
        this.loading = false;
        this.auth.setToken(res.token);
        this.auth.setUser(res.user);
      },
      (err) => {
        this.auth.logout();
        this.loading = false;
        if (err.status === 422) {
          let index = 0;
          for (const error of err.error.errors) {
            this.message += String(error.param).toUpperCase();
            console.log(error.param);
            if (index !== err.error.errors.length) {
              this.message += ', ';
            } else {
              this.message += ' ';
            }
            index++;
          }

          this.message += 'inválidos!';
        } else {
          this.message = err.status === 400 ? 'E-mail ou senha não encontrados!' : 'Ocorreu um erro ao fazer login!';
        }

        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
    );
  }

}
