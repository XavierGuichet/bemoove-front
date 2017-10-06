import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutListRoutingModule } from './workout-list-routing.module';
import { WorkoutListMaconneryComponent } from './display/maconnery/workout-list-display-maconnery.component';
import { WorkoutBlockComponent } from './display/maconnery/workout-block/workout-block.component';
import { WorkoutDetailsComponent } from './display/details/workout-details.component';

import { WorkoutService, SpaceService } from '../_services/index';

@NgModule({
    bootstrap: [
        WorkoutListComponent
    ],
  imports:      [
        CommonModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        WorkoutListRoutingModule
    ],
  declarations: [
        WorkoutListComponent,
        WorkoutListMaconneryComponent,
        WorkoutBlockComponent,
        WorkoutDetailsComponent
    ],
  exports:      [ WorkoutListComponent ],
  entryComponents: [ ],
  providers:    [
        WorkoutService,
        SpaceService
    ]
})
export class WorkoutListModule { }
