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
import { NavModule } from '../../nav/nav.module';

import { OnlyNumberDirective } from '../../_directives/index';

const ORGANIZATION_COMPONENTS = [
    OrganizationComponent,
    OrganizationInformationsComponent,
    InvoiceSettingsComponent,
    BankAccountComponent,
    BillingMandateComponent
];

const ORGANIZATION_FORMS = [
    AddressFormComponent,
    BusinessInfoFormComponent,
    LegalRepresentativeFormComponent,
    InvoiceNoticeFormComponent,
    TvaRateFormComponent
];

@NgModule({
    bootstrap: [
        OrganizationComponent,
    ],
  imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        OrganizationRoutingModule,
        NavModule
    ],
  declarations: [
      ORGANIZATION_COMPONENTS,
      ORGANIZATION_FORMS,
      OnlyNumberDirective
    ],
  exports: [ OrganizationComponent ],
  entryComponents: [ ],
  providers:    [

    ]
})
export class OrganizationModule { }
