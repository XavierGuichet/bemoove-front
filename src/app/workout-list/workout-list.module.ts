import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { OrderModule } from '../order/order.module';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutListRoutingModule } from './workout-list-routing.module';
import { WorkoutListMaconneryComponent } from './display/maconnery/workout-list-display-maconnery.component';
import { WorkoutBlockComponent } from './display/block/workout-block.component';
import { WorkoutDetailsComponent } from './display/details/workout-details.component';

import { WorkoutService, SpaceService } from '../_services/index';

// Pipes
import { MyTimePipe } from '../_pipes/time.pipe';
@NgModule({
    bootstrap: [
        WorkoutListComponent
    ],
  imports:      [
        SharedModule,
        WorkoutListRoutingModule,
        OrderModule
    ],
  declarations: [
        WorkoutListComponent,
        WorkoutListMaconneryComponent,
        WorkoutBlockComponent,
        WorkoutDetailsComponent,

        MyTimePipe
    ],
  exports:      [ WorkoutListComponent, WorkoutBlockComponent ],
  entryComponents: [ ],
  providers:    [
        WorkoutService,
        SpaceService
    ]
})
export class WorkoutListModule { }
