import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { CoachComponent }    from './coach.component';
import { CoachAddWorkoutComponent }   from './add-workout/add-workout.component';
import { CoachEditWorkoutComponent }   from './edit-workout/edit-workout.component';
import { CoachMyAddressComponent }   from './my-address/my-address.component';
import { CoachMyBookingComponent }   from './my-booking/my-booking.component';
import { CoachMyWorkoutComponent }   from './my-workout/my-workout.component';
import { CoachProfileComponent }   from './profile/profile.component';

import { SpaceService } from '../_services/space.service';

import { AuthUserGuard, AuthCoachGuard } from '../_guards/index';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'coach',
    component: CoachComponent,
    canActivate: [AuthCoachGuard],
    children: [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'add-workout', component: CoachAddWorkoutComponent },
        { path: 'edit-workout', component: CoachEditWorkoutComponent },
        { path: 'my-address', component: CoachMyAddressComponent },
        { path: 'my-booking', component: CoachMyBookingComponent },
        { path: 'my-workout', component: CoachMyWorkoutComponent },
        { path: 'profile', component: CoachProfileComponent }
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class CoachRoutingModule {}
