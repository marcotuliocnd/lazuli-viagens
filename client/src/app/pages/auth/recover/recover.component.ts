import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthService as Auth} from '../../../services/auth.service';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;
  message: string = 'Enviaremos uma nova senha para seu e-mail:';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private auth: Auth,
  ) {
    this.formGroup = this.formBuilder.group({
      email: '',
    });
  }

  ngOnInit(): void {
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }

  onSubmit() {
    this.loading = true;
    this.authService.recover(this.formGroup.value).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        this.auth.logout();
        this.loading = false;
      }
    );
  }

}
