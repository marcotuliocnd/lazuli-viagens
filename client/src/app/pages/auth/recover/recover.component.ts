import { ToastrService } from 'ngx-toastr';
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
  message: string = 'Enviamos para esse endereço de e-mail um passo a passo para você recuperar sua conta!';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private auth: Auth,
    private toastr: ToastrService,
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
        this.toastr.success(this.message);
      },
      (err) => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
        this.toastr.success(this.message);
      }
    );
  }

}
