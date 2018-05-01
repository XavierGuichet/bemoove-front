import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CheckoutProcesComponent } from './checkout-process.component';

import { AuthentificationComponent } from './1-authentification/authentification.component';
import { InformationsComponent } from './2-informations/informations.component';
import { SummaryComponent } from './3-summary/summary.component';
import { ValidationComponent } from './4-validation/validation.component';
import { SuccessComponent } from './5-success/success.component';
import { RetryComponent } from './5-retry/retry.component';

import { SpaceService } from '../../_services/space.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'step',
      component: CheckoutProcesComponent,
      children: [
          { path: 'login', component: AuthentificationComponent },
          { path: 'my-information', component: InformationsComponent },
          { path: 'summary', component: SummaryComponent },
          { path: 'validation/:id', component: ValidationComponent },
          { path: 'success/:id', component: SuccessComponent },
          { path: 'retry/:id', component: RetryComponent }
      ]
    }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class CheckoutProcessRoutingModule { }
