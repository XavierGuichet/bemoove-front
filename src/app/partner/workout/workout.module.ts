import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { WorkoutComponent } from './workout.component';
import { WorkoutListComponent } from './list/workout-list.component';
import { WorkoutFormComponent } from './form/workout/workout-form.component';
import { WorkoutAddComponent } from './add/workout-add.component';
import { WorkoutEditComponent } from './edit/workout-edit.component';
import { WorkoutPreviewComponent } from './preview/workout-preview.component';
import { WorkoutInstanceFormComponent } from './form/workout-instance/workout-instance-form.component';

import { TagsSelectorComponent } from './tags-selector/tags-selector.component';
import { BMImageInputComponent } from '../../form/bm-image-input/bm-image-input.component';

import { AddressFormComponent } from './form/address/address-form.component';
import { ModalAddressFormComponent } from './modal/modal-address-form.component';

import { WorkoutRoutingModule } from './workout-routing.module';

import { BmFormModule } from '../../shared/form.module';

import { WorkoutService, WorkoutInstanceService,
    ImageService,
    SpaceService } from '../../_services/index';

@NgModule({
    bootstrap: [
        WorkoutComponent,
    ],
  imports: [
        SharedModule,
        BmFormModule,
        WorkoutRoutingModule
    ],
  declarations: [
      WorkoutComponent,
      WorkoutListComponent,
      WorkoutFormComponent,
      WorkoutAddComponent,
      WorkoutEditComponent,
      WorkoutInstanceFormComponent,
      WorkoutPreviewComponent,
      AddressFormComponent,
      ModalAddressFormComponent,
      TagsSelectorComponent,
      BMImageInputComponent
    ],
  exports: [ WorkoutComponent ],
  entryComponents: [ ModalAddressFormComponent ],
  providers:    [
      WorkoutService,
      WorkoutInstanceService
    ]
})
export class WorkoutModule { }
