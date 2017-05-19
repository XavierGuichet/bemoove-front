import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoachComponent } from './coach.component';
import { CoachAddWorkoutComponent } from './add-workout/add-workout.component';
import { CoachEditWorkoutComponent } from './edit-workout/edit-workout.component';
import { CoachMyWorkoutComponent } from './my-workout/my-workout.component';
import { CoachMyProfileComponent } from './my-profile/my-profile.component';

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
        { path: 'my-workout', component: CoachMyWorkoutComponent },
        { path: 'profile', component: CoachMyProfileComponent }
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class CoachRoutingModule {}
