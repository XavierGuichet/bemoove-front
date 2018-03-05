import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderCheckOutComponent } from './checkout/order-checkout.component';
import { OrderSuccessComponent } from './success/success.component';

import { SpaceService } from '../_services/space.service';

@NgModule({
  imports: [RouterModule.forChild([
      {
          path: 'order/success/:idreservation',
          component: OrderSuccessComponent,
          canActivate: []
      },
    {
    path: 'order/:idworkout/:idsession',
    component: OrderCheckOutComponent,
    canActivate: []
    }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
