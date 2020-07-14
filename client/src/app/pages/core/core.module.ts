import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { TripsComponent } from './trips/trips.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [TripsComponent, NavComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ]
})
export class CoreModule { }
