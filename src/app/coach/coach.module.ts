import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { NgbModule }        from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { Ng2CompleterModule } from "ng2-completer";
import { ImageUploadModule } from "angular2-image-upload";

import { CoachComponent } from './coach.component';
import { CoachRoutingModule } from './coach-routing.module';

import { CoachAddWorkoutComponent }   from './add-workout/add-workout.component';
import { CoachEditWorkoutComponent }   from './edit-workout/edit-workout.component';
import { CoachMyAddressComponent }   from './my-address/my-address.component';
import { CoachMyBookingComponent }   from './my-booking/my-booking.component';
import { CoachMyWorkoutComponent }   from './my-workout/my-workout.component';
import { CoachProfileComponent }   from './profile/profile.component';
import { CoachNavComponent }   from './nav/nav.component';
import { WorkoutFormComponent } from './form/workout/workout.component';
import { AddressFormComponent } from './form/address/address.component';
import { WorkoutPreviewComponent }    from './workout-preview/workout-preview.component';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalAddressForm } from './modal/modal-address-form.component';

import { SportService } from '../_services/sport.service';
import { AddressService } from '../_services/address.service';
import { WorkoutService }   from '../_services/workout.service';
import { TagService } from '../_services/tag.service';
import { SpaceService } from '../_services/space.service';

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
        CoachRoutingModule,
        Ng2CompleterModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        ImageUploadModule.forRoot()
    ],
  declarations: [
        CoachComponent,
        CoachAddWorkoutComponent,
        CoachEditWorkoutComponent,
        CoachMyAddressComponent,
        CoachMyBookingComponent,
        CoachMyWorkoutComponent,
        CoachProfileComponent,
        CoachNavComponent,
        WorkoutFormComponent,
        AddressFormComponent,
        WorkoutPreviewComponent,
        ModalAddressForm,
        ImageToBase64Directive
    ],
  exports:      [ CoachComponent ],
  entryComponents: [ ModalAddressForm ],
  providers:    [
        SportService,
        AddressService,
        TagService,
        WorkoutService,
        SpaceService ]
})
export class CoachModule { }
