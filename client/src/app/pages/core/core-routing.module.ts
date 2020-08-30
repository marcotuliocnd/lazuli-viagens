import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FidelityComponent } from './fidelity/fidelity.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { TripsComponent } from './trips/trips.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'trips' },
  {
    path: 'trips',
    component: TripsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'fidelity',
    component: FidelityComponent,
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
