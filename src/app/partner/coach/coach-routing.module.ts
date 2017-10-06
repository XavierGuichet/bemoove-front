import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoachComponent } from './coach.component';
import { ListComponent } from './list/list.component';
import { CoachAddComponent } from './add/coach-add.component';
import { CoachEditComponent } from './edit/coach-edit.component';

const coachRoutes: Routes = [
  {
  path: 'coach',
  component: CoachComponent,
  children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: 'add', component: CoachAddComponent },
      { path: ':id/edit', component: CoachEditComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(coachRoutes)],
  providers: [ ],
  exports: [RouterModule]
})
export class CoachRoutingModule {}
