import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganizationComponent } from './organization.component';
import { OrganizationInformationsComponent } from './informations/informations.component';
import { BillingMandateComponent } from './billing-mandate/billing-mandate.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';

import { AddressFormComponent } from './form/address/address-form.component';
import { BusinessInfoFormComponent } from './form/business-info/business-info-form.component';
import { LegalRepresentativeFormComponent } from './form/legalrepresentative/legalrepresentative-form.component';
import { InvoiceNoticeFormComponent } from './form/invoice-notice/invoice-notice-form.component';
import { TvaRateFormComponent } from './form/tva-rate/tva-rate-form.component';

import { OrganizationRoutingModule } from './organization-routing.module';
import { PartnerNavSecondaryModule } from '../nav/secondary/nav-secondary.module';

@NgModule({
    bootstrap: [
        OrganizationComponent,
    ],
  imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        OrganizationRoutingModule,
        PartnerNavSecondaryModule
    ],
  declarations: [
      OrganizationComponent,
      OrganizationInformationsComponent,
      InvoiceSettingsComponent,
      BankAccountComponent,
      BillingMandateComponent,
      AddressFormComponent,
      BusinessInfoFormComponent,
      LegalRepresentativeFormComponent,
      TvaRateFormComponent,
      InvoiceNoticeFormComponent
    ],
  exports: [ OrganizationComponent ],
  entryComponents: [ ],
  providers:    [

    ]
})
export class OrganizationModule { }
