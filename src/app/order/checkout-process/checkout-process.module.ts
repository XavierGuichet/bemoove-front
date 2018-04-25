import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BmFormModule } from '../../shared/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountManagerModule } from '../../account-manager/account-manager.module';
import { CheckoutProcesComponent } from './checkout-process.component';
import { CheckoutProcessRoutingModule } from './checkout-process-routing.module';

import { UserInformationFormComponent } from '../form/user-information/user-information-form.component';
import { AuthentificationComponent } from './1-authentification/authentification.component';
import { InformationsComponent } from './2-informations/informations.component';
import { SummaryComponent } from './3-summary/summary.component';
import { ValidationComponent } from './4-validation/validation.component';

@NgModule({
    bootstrap: [

    ],
  imports:      [
        SharedModule,
        BmFormModule,
        FormsModule,
        ReactiveFormsModule,
        AccountManagerModule,
        CheckoutProcessRoutingModule
    ],
  declarations: [
        CheckoutProcesComponent,
        AuthentificationComponent,
        InformationsComponent,
        UserInformationFormComponent,
        SummaryComponent,
        ValidationComponent
    ],
  exports:      [ ],
  entryComponents: [ ],
  providers:    [
    ]
})
export class CheckoutProcessModule { }
