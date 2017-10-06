import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlanningModule } from './planning/planning.module';
import { CoachModule } from './coach/coach.module';
import { OrganizationModule } from './organization/organization.module';
import { WorkoutModule } from './workout/workout.module';

import { PartnerComponent } from './partner.component';

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
        { path: '', loadChildren : () => WorkoutModule },
        { path: '', loadChildren : () => OrganizationModule },
        { path: '', loadChildren : () => CoachModule },
        { path: '', loadChildren : () => PlanningModule }
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class PartnerRoutingModule {}
