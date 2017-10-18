import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { CoachComponent } from './coach.component';
import { ListComponent } from './list/list.component';
import { CoachFormComponent } from './form/coach-form.component';
import { CoachViewComponent } from './view/coach-view.component';
import { CoachAddComponent } from './add/coach-add.component';
import { CoachEditComponent } from './edit/coach-edit.component';
import { CoachDashBoardComponent } from './dashboard/coach-dashboard.component';

import { CoachRoutingModule } from './coach-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { BmFormModule } from '../../shared/form.module';
import { PartnerNavSecondaryModule } from '../nav/secondary/nav-secondary.module';

import { CoachService,
    ImageService,
    SpaceService } from '../../_services/index';

@NgModule({
    bootstrap: [
        CoachComponent,
    ],
  imports: [
        CommonModule,
        BmFormModule,
        SharedModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        CoachRoutingModule,
        PartnerNavSecondaryModule
    ],
  declarations: [
      CoachComponent,
      CoachViewComponent,
      ListComponent,
      CoachFormComponent,
      CoachAddComponent,
      CoachEditComponent,
      CoachDashBoardComponent
    ],
  exports: [ CoachComponent ],
  entryComponents: [ ],
  providers:    [
      CoachService
    ]
})
export class CoachModule { }
