import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { IdentityFormComponent } from './form/identity/identity-form.component';
import { AddressFormComponent } from './form/address/address-form.component';

import { ContactInformationComponent } from './contact-information/contact-information.component';
import { IdentityComponent } from './identity/identity.component';
import { ProfileComponent } from './profile.component';

import { ProfileRoutingModule } from './profile-routing.module';

import { BmFormModule } from '../../shared/form.module';
import { NavModule } from '../../nav/nav.module';

@NgModule({
  bootstrap: [
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    BmFormModule,
    ProfileRoutingModule,
    NavModule
  ],
  declarations: [
    ProfileComponent,
    ContactInformationComponent,
    IdentityComponent,
    AddressFormComponent,
    IdentityFormComponent
  ],
  exports: [],
  entryComponents: [],
  providers: [
  ]
})
export class ProfileModule { }
