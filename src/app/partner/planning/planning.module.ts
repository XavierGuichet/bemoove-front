import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PlanningComponent } from './planning.component';
import { ViewComponent } from './view/view.component';
import { PlanningRoutingModule } from './planning-routing.module';

import { WorkoutModalComponent } from './workout-information/workout-modal.component';
import { WorkoutInformationComponent } from './workout-information/workout-information.component';

import { AddSessionFormComponent } from './form/add-session-form.component';
import { AddSessionModalComponent } from './modal/add-session-modal.component';

@NgModule({
    bootstrap: [
        PlanningComponent,
    ],
  imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PlanningRoutingModule
    ],
  declarations: [
      PlanningComponent,
      ViewComponent,
      WorkoutModalComponent,
      WorkoutInformationComponent,
      AddSessionFormComponent,
      AddSessionModalComponent
    ],
  exports: [ PlanningComponent ],
  entryComponents: [ WorkoutModalComponent, AddSessionModalComponent ],
  providers:    [
    ]
})
export class PlanningModule { }
