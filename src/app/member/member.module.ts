import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../_helpers/custom-datepicker.component';

import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';
import { NavModule } from '../nav/nav.module';

import { ProfileModule } from './profile/profile.module';

import { MyReservationComponent } from './my-reservation/my-reservation.component';
import { ReservationsListComponent } from './my-reservation/reservations-list/reservations-list.component';

import { AlertComponent } from '../_directives/index';
import { AlertService } from '../_services/index';

@NgModule({
    bootstrap: [
        MemberComponent
    ],
  imports:      [
        SharedModule,
        FormsModule,
        NavModule,
        ReactiveFormsModule,
        MemberRoutingModule,
        ProfileModule
    ],
  declarations: [
        MemberComponent,
        MyReservationComponent,
        ReservationsListComponent
    ],
  exports:      [ MemberComponent ],
  entryComponents: [  ],
  providers:    [
      AlertService,
      {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n} ]
})
export class MemberModule { }
