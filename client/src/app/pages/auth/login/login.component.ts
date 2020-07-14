import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';

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
        console.log(res);
      },
      (err) => {
        this.loading = false;
        if (err.status === 422) {
          let index = 0;
          for (const error of err.error.errors) {
            this.message += error.param;
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
          this.message = err.status === 400 ? 'E-mail ou senha inválido!' : 'Ocorreu um erro ao fazer login!';
        }

        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
    );
  }

}
