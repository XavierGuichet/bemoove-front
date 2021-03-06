import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { BmFormModule } from '../shared/form.module';

import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../_helpers/custom-datepicker.component';

import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';

import { PlanningModule } from './planning/planning.module';
import { CoachModule } from './coach/coach.module';
import { WorkoutModule } from './workout/workout.module';

import { NavModule } from '../nav/nav.module';

import { SportService,
  AddressService,
  BankAccountService,
  BusinessService,
  BillingMandateSignService,
  PersonService,
  ImageService,
  WorkoutService,
  TagService,
  SpaceService,
  CartService
} from '../_services/index';

import { WorkoutDateProvider } from './workoutdate.provider';

import { ImageToBase64Directive } from '../_directives/image-to-base64.attribute';

@NgModule({
  bootstrap: [
    PartnerComponent
  ],
  imports: [
    SharedModule,
    BmFormModule,
    NavModule,
    PlanningModule,
    CoachModule,
    WorkoutModule,
    PartnerRoutingModule
  ],
  declarations: [
    PartnerComponent,
    ImageToBase64Directive
  ],
  exports: [PartnerComponent],
  entryComponents: [
  ],
  providers: [
    BankAccountService,
    BusinessService,
    BillingMandateSignService,
    PersonService,
    SportService,
    AddressService,
    TagService,
    WorkoutService,
    ImageService,
    SpaceService,
    CartService,
    WorkoutDateProvider,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class PartnerModule { }
