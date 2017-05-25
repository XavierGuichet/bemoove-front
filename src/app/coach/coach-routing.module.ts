import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlanningModule } from './planning/planning.module';
import { CoachComponent } from './coach.component';
import { CoachWorkoutAddComponent } from './workout/add/workout-add.component';
import { CoachWorkoutEditComponent } from './workout/edit/workout-edit.component';
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
        { path: 'workout/add', component: CoachWorkoutAddComponent },
        { path: 'workout/edit', component: CoachWorkoutEditComponent },
        { path: 'profile', component: CoachMyProfileComponent },
        { path: '', loadChildren : () => PlanningModule }
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class CoachRoutingModule {}
