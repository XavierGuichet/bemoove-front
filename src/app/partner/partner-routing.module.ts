import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlanningModule } from './planning/planning.module';
import { OrganizationModule } from './organization/organization.module';

import { PartnerComponent } from './partner.component';
import { PartnerWorkoutAddComponent } from './workout/add/workout-add.component';
import { PartnerWorkoutEditComponent } from './workout/edit/workout-edit.component';

import { SpaceService } from '../_services/space.service';

import { AuthPartnerGuard } from '../_guards/index';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'partner',
    component: PartnerComponent,
    canActivate: [AuthPartnerGuard],
    children: [
        { path: '', redirectTo: 'planning', pathMatch: 'full' },
        { path: 'workout/add', component: PartnerWorkoutAddComponent },
        { path: 'workout/:id/edit', component: PartnerWorkoutEditComponent },
        { path: '', loadChildren : () => PlanningModule },
        { path: '', loadChildren : () => OrganizationModule }
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class PartnerRoutingModule {}
