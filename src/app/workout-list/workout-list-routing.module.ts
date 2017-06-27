import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutListMaconneryComponent } from './display/maconnery/workout-list-display-maconnery.component';

import { SpaceService } from '../_services/space.service';

import { AuthUserGuard, AuthCoachGuard } from '../_guards/index';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'workouts',
    component: WorkoutListComponent,
    canActivate: [],
    children: [
        { path: '', redirectTo: 'view', pathMatch: 'full' },
        { path: 'view', component: WorkoutListMaconneryComponent },
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class WorkoutListRoutingModule {}
