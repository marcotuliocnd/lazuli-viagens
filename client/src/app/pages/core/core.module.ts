import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDatepickerModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { CoreRoutingModule } from './core-routing.module';
import { TripsComponent } from './trips/trips.component';
import { NavComponent } from './components/nav/nav.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [TripsComponent, NavComponent, UsersComponent, ProfileComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgbModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CoreModule { }
