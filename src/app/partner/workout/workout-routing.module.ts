import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutComponent } from './workout.component';
import { WorkoutListComponent } from './list/workout-list.component';
import { WorkoutAddComponent } from './add/workout-add.component';
import { WorkoutEditComponent } from './edit/workout-edit.component';
import { WorkoutInstanceFormComponent } from './form/workout-instance/workout-instance-form.component';

const workoutRoutes: Routes = [
  {
  path: 'workouts',
  component: WorkoutComponent,
  children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WorkoutListComponent },
      { path: 'add', component: WorkoutAddComponent },
      { path: ':id/edit', component: WorkoutEditComponent },
      { path: ':id/dates/add', component: WorkoutInstanceFormComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(workoutRoutes)],
  providers: [ ],
  exports: [RouterModule]
})
export class WorkoutRoutingModule {}
