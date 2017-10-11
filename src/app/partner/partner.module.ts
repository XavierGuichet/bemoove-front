import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { BmFormModule } from '../shared/form.module';

import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../_helpers/custom-datepicker.component';

import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';

import { PlanningModule } from './planning/planning.module';
import { CoachModule } from './coach/coach.module';
import { WorkoutModule } from './workout/workout.module';

import { PartnerNavPrimaryComponent } from './nav/primary/nav-primary.component';

import { SportService,
  AddressService,
  BankAccountService,
  BusinessService,
  PersonService,
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
    PartnerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BmFormModule,
    NgbModule.forRoot(),
    MaterialModule.forRoot(),
    PlanningModule,
    CoachModule,
    WorkoutModule,
    PartnerRoutingModule
  ],
  declarations: [
    PartnerComponent,
    PartnerNavPrimaryComponent,
    ImageToBase64Directive
  ],
  exports: [PartnerComponent],
  entryComponents: [
  ],
  providers: [
    BankAccountService,
    BusinessService,
    PersonService,
    SportService,
    AddressService,
    TagService,
    WorkoutService,
    ImageService,
    SpaceService,
    BookingService,
    WorkoutDateProvider,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class PartnerModule { }
