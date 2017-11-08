import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutListRoutingModule } from './workout-list-routing.module';
import { WorkoutListMaconneryComponent } from './display/maconnery/workout-list-display-maconnery.component';
import { WorkoutBlockComponent } from './display/block/workout-block.component';
import { WorkoutDetailsComponent } from './display/details/workout-details.component';

import { WorkoutService, SpaceService } from '../_services/index';

@NgModule({
    bootstrap: [
        WorkoutListComponent
    ],
  imports:      [
        SharedModule,
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
