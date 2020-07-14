import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
    console.log(this.formGroup.value);
  }

}
