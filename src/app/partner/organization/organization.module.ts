import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { OrganizationComponent } from './organization.component';
import { OrganizationInformationsComponent } from './informations/informations.component';
import { BillingMandateComponent } from './billing-mandate/billing-mandate.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';

import { AddressFormComponent } from './form/address/address-form.component';
import { BusinessInfoFormComponent } from './form/business-info/business-info-form.component';
import { LegalRepresentativeFormComponent } from './form/legalrepresentative/legalrepresentative-form.component';

import { OrganizationRoutingModule } from './organization-routing.module';

import { PartnerNavSecondaryComponent } from '../nav/secondary/nav-secondary.component';

@NgModule({
    bootstrap: [
        OrganizationComponent,
    ],
  imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        OrganizationRoutingModule
    ],
  declarations: [
      OrganizationComponent,
      OrganizationInformationsComponent,
      InvoiceSettingsComponent,
      BankAccountComponent,
      BillingMandateComponent,
      PartnerNavSecondaryComponent,
      AddressFormComponent,
      BusinessInfoFormComponent,
      LegalRepresentativeFormComponent
    ],
  exports: [ OrganizationComponent ],
  entryComponents: [ ],
  providers:    [

    ]
})
export class OrganizationModule { }
