import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CheckoutProcessModule } from './checkout-process/checkout-process.module';
import { OrderSuccessComponent } from './success/success.component';

import { SpaceService } from '../_services/space.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'order',
      children: [
          { path: 'checkout', loadChildren : () => CheckoutProcessModule },
        ]
    }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
