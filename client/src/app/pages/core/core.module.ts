import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDatepickerModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { CoreRoutingModule } from './core-routing.module';
import { TripsComponent } from './trips/trips.component';
import { NavComponent } from './components/nav/nav.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { FidelityComponent } from './fidelity/fidelity.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { StarsComponent } from './components/stars/stars.component';

@NgModule({
  declarations: [TripsComponent, NavComponent, UsersComponent, ProfileComponent, FidelityComponent, TestimonialsComponent, StarsComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgbModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CoreModule { }
