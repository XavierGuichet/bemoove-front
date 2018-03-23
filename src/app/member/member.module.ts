import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../_helpers/custom-datepicker.component';

import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';
import { NavModule } from '../nav/nav.module';

import { ProfileModule } from './profile/profile.module';

import { MemberReservationComponent } from './reservation/reservation.component';
import { MemberHistoryComponent } from './history/history.component';

import { AlertComponent } from '../_directives/index';
import { AlertService, ProfileService } from '../_services/index';

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
        MemberReservationComponent,
        MemberHistoryComponent
    ],
  exports:      [ MemberComponent ],
  entryComponents: [  ],
  providers:    [
      AlertService,
      ProfileService,
        {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n} ]
})
export class MemberModule { }
