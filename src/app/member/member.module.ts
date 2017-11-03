import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../_helpers/custom-datepicker.component';

import { MemberComponent } from './member.component';
import { MemberProfileComponent } from './profile/profile.component';
import { MemberRoutingModule } from './member-routing.module';

import { MemberNavComponent } from './nav/nav.component';

import { AddressFormReactiveComponent } from './form/address/address-form-reactive.component';
import { ContactDetailsFormReactiveComponent } from './form/contact-details/contact-details-form-reactive.component';
import { EmailChangeFormReactiveComponent } from './form/email-change/email-change-form-reactive.component';
import { PasswordChangeFormReactiveComponent } from './form/password-change/password-change-form-reactive.component';
import { PersonnalInformationsFormReactiveComponent } from './form/personnal-informations/personnal-informations-form-reactive.component';

import { AlertComponent } from '../_directives/index';
import { AlertService, ProfileService } from '../_services/index';

@NgModule({
    bootstrap: [
        MemberComponent
    ],
  imports:      [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        MemberRoutingModule
    ],
  declarations: [
        MemberComponent,
        MemberProfileComponent,
        MemberNavComponent,
        AddressFormReactiveComponent,
        ContactDetailsFormReactiveComponent,
        EmailChangeFormReactiveComponent,
        PasswordChangeFormReactiveComponent,
        PersonnalInformationsFormReactiveComponent
    ],
  exports:      [ MemberComponent ],
  entryComponents: [  ],
  providers:    [
      AlertService,
      ProfileService,
        {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n} ]
})
export class MemberModule { }
