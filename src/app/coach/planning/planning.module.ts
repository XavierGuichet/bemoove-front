import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { PlanningComponent } from './planning.component';
import { ViewComponent } from './view/view.component';
import { PlanningRoutingModule } from './planning-routing.module';

@NgModule({
    bootstrap: [
        PlanningComponent
    ],
  imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        PlanningRoutingModule
    ],
  declarations: [
      PlanningComponent,
      ViewComponent,
    ],
  exports: [ PlanningComponent ],
  entryComponents: [ ],
  providers:    [
    ]
})
export class PlanningModule { }
