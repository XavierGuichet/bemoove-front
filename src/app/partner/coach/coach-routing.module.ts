import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoachComponent } from './coach.component';
import { ListComponent } from './list/list.component';
import { CoachDashBoardComponent } from './dashboard/coach-dashboard.component';
import { CoachAddComponent } from './add/coach-add.component';
import { CoachEditComponent } from './edit/coach-edit.component';
import { CoachViewComponent } from './view/coach-view.component';

const coachRoutes: Routes = [
  {
  path: 'coach',
  component: CoachComponent,
  children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CoachDashBoardComponent },
      { path: 'add', component: CoachAddComponent },
      { path: ':id', component: CoachViewComponent },
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
