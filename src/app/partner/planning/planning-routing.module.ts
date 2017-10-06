import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanningComponent } from './planning.component';
import { ViewComponent } from './view/view.component';

const planningRoutes: Routes = [
  {
  path: 'planning',
  component: PlanningComponent,
  children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ViewComponent },
      { path: 'view/coach/:id', component: ViewComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(planningRoutes)],
  providers: [ ],
  exports: [RouterModule]
})
export class PlanningRoutingModule {}
