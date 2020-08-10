import { IUser } from './../../../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthService as Auth} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      name: '',
      email: '',
      password: '',
      cellphone: '',
      cpf: '',
      rg: '',
      birthdate_at: '',
    });
  }

  ngOnInit(): void {
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }

  onSubmit() {
    this.loading = true;
    this.authService.register(this.formGroup.value).subscribe(
      (res) => {
        this.loading = false;
        this.auth.setToken(res.token);
        this.auth.setUser(res.user as IUser);
        this.router.navigate(['/panel']);
      },
      (err) => {
        this.auth.logout();
        this.loading = false;
        if (err.status === 422) {
          let index = 0;
          for (const error of err.error.errors) {
            this.message += String(error.param)[0].toUpperCase() + String(error.param).slice(1);
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
