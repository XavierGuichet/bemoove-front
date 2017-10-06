import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutListMaconneryComponent } from './display/maconnery/workout-list-display-maconnery.component';
import { WorkoutDetailsComponent } from './display/details/workout-details.component';

import { SpaceService } from '../_services/space.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'workouts',
    component: WorkoutListComponent,
    canActivate: [],
    children: [
        { path: '', redirectTo: 'view', pathMatch: 'full' },
        { path: 'view', component: WorkoutListMaconneryComponent },
        { path: 'view/:id', component: WorkoutDetailsComponent },
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class WorkoutListRoutingModule {}
