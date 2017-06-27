import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../_helpers/custom-datepicker.component';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Ng2CompleterModule } from 'ng2-completer';
import { ImageUploadModule } from 'angular2-image-upload';

import { CoachComponent } from './coach.component';
import { CoachRoutingModule } from './coach-routing.module';
import { PlanningModule } from './planning/planning.module';

import { CoachWorkoutAddComponent } from './workout/add/workout-add.component';
import { CoachWorkoutEditComponent } from './workout/edit/workout-edit.component';
import { WorkoutPreviewComponent } from './workout/preview/workout-preview.component';

import { CoachMyProfileComponent } from './my-profile/my-profile.component';
import { CoachNavComponent } from './nav/nav.component';
import { WorkoutFormReactiveComponent } from './workout/form/workout-form-reactive.component';
import { AddressFormComponent } from './form/address/address.component';

import { ModalAddressFormComponent } from './modal/modal-address-form.component';

import { SportService,
         AddressService,
         ImageService,
         WorkoutService,
         TagService,
         SpaceService,
         BookingService
     } from '../_services/index';

import { WorkoutDateProvider } from './workoutdate.provider';

import { ImageToBase64Directive } from '../_directives/image-to-base64.attribute';

@NgModule({
    bootstrap: [
        CoachComponent
    ],
  imports:      [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        PlanningModule,
        CoachRoutingModule,
        Ng2CompleterModule,
        ImageUploadModule.forRoot(),
    ],
  declarations: [
        CoachComponent,
        CoachWorkoutAddComponent,
        CoachWorkoutEditComponent,
        WorkoutPreviewComponent,
        CoachMyProfileComponent,
        CoachNavComponent,
        WorkoutFormReactiveComponent,
        AddressFormComponent,
        ModalAddressFormComponent,
        ImageToBase64Directive,
        ImageCropperComponent
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
        BookingService,
        WorkoutDateProvider,
        {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n} ]
})
export class CoachModule { }
