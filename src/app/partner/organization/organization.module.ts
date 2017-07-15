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

import { OrganizationRoutingModule } from './organization-routing.module';

import { PartnerNavSecondaryComponent } from '../nav/secondary/nav-secondary.component';

import { BankAccountService } from './_services/bank-account.service';

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
      PartnerNavSecondaryComponent
    ],
  exports: [ OrganizationComponent ],
  entryComponents: [ ],
  providers:    [
      BankAccountService
    ]
})
export class OrganizationModule { }
