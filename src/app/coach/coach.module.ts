import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { Ng2CompleterModule } from 'ng2-completer';
import { ImageUploadModule } from 'angular2-image-upload';

import { CoachComponent } from './coach.component';
import { CoachRoutingModule } from './coach-routing.module';
import { PlanningModule } from './planning/planning.module';

import { CoachAddWorkoutComponent } from './add-workout/add-workout.component';
import { CoachEditWorkoutComponent } from './edit-workout/edit-workout.component';
import { CoachMyProfileComponent } from './my-profile/my-profile.component';
import { CoachNavComponent } from './nav/nav.component';
import { WorkoutFormComponent } from './form/workout/workout.component';
import { AddressFormComponent } from './form/address/address.component';
import { WorkoutPreviewComponent } from './workout-preview/workout-preview.component';

import { ModalAddressFormComponent } from './modal/modal-address-form.component';

import { SportService } from '../_services/sport.service';
import { AddressService } from '../_services/address.service';
import { ImageService } from '../_services/image.service';
import { WorkoutService } from '../_services/workout.service';
import { TagService } from '../_services/tag.service';
import { SpaceService } from '../_services/space.service';

import { WorkoutDateProvider } from './workoutdate.provider';

import { ImageToBase64Directive } from '../_directives/image-to-base64.attribute';

@NgModule({
    bootstrap: [
        CoachComponent
    ],
  imports:      [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        PlanningModule,
        CoachRoutingModule,
        Ng2CompleterModule,
        ImageUploadModule.forRoot(),
    ],
  declarations: [
        CoachComponent,
        CoachAddWorkoutComponent,
        CoachEditWorkoutComponent,
        CoachMyProfileComponent,
        CoachNavComponent,
        WorkoutFormComponent,
        AddressFormComponent,
        WorkoutPreviewComponent,
        ModalAddressFormComponent,
        ImageToBase64Directive
    ],
  exports:      [ CoachComponent ],
  entryComponents: [ ModalAddressFormComponent ],
  providers:    [
        SportService,
        AddressService,
        TagService,
        WorkoutService,
        ImageService,
        SpaceService,
        WorkoutDateProvider ]
})
export class CoachModule { }
