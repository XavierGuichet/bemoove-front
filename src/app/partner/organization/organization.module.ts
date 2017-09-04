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

import { LegalRepresentativeFormReactiveComponent } from './form/legalrepresentative/legalrepresentative-reactive-form.component';

import { OrganizationRoutingModule } from './organization-routing.module';

import { PartnerNavSecondaryComponent } from '../nav/secondary/nav-secondary.component';

import { BankAccountService } from './_services/bank-account.service';
import { LegalRepresentativeService } from './_services/legal-representative.service';
import { InvoiceSettingsService } from './_services/invoice-settings.service';
import { PersonService } from './_services/person.service';

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
      LegalRepresentativeFormReactiveComponent
    ],
  exports: [ OrganizationComponent ],
  entryComponents: [ ],
  providers:    [
      BankAccountService,
      LegalRepresentativeService,
      InvoiceSettingsService,
      PersonService
    ]
})
export class OrganizationModule { }