import { NgbDatepickerModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoverComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgbDatepickerModule,
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AuthModule { }
