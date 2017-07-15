import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationComponent } from './organization.component';
import { OrganizationInformationsComponent } from './informations/informations.component';
import { BillingMandateComponent } from './billing-mandate/billing-mandate.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';

const OrganizationRoutes: Routes = [
  {
  path: 'organization',
  component: OrganizationComponent,
  children: [
      { path: '', redirectTo: 'informations', pathMatch: 'full' },
      { path: 'informations', component: OrganizationInformationsComponent },
      { path: 'billing-mandate', component: BillingMandateComponent },
      { path: 'bank-account', component: BankAccountComponent },
      { path: 'invoice-settings', component: InvoiceSettingsComponent },
      { path: '**', redirectTo: 'informations' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(OrganizationRoutes)],
  providers: [ ],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
