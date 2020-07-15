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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
