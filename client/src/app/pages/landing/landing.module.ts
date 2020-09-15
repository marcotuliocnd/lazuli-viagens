import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { NgbDatepickerModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class LandingModule { }
