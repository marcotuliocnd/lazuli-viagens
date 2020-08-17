import { ToastrService } from 'ngx-toastr';
import { IUser } from './../../../interfaces/User';
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
    private toastr: ToastrService,
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
        this.toastr.success('Logado com sucesso!');
        this.auth.setToken(res.token);
        this.auth.setUser(res.user as IUser);
        this.router.navigate(['panel']);
      },
      (err) => {
        this.auth.logout();
        this.loading = false;
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

        this.toastr.error(message);
      }
    );
  }

}
