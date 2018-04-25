import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountManagerModule } from '../account-manager/account-manager.module';
import { OrderBlockComponent } from './block/order-block.component';
import { CheckoutProcessModule } from './checkout-process/checkout-process.module';
import { OrderRoutingModule } from './order-routing.module';

import { OrderService, ReservationService, SpaceService, WorkoutService } from '../_services/index';
import { CheckoutService } from './_services/checkout.service';

@NgModule({
    bootstrap: [

    ],
  imports:      [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AccountManagerModule,
        CheckoutProcessModule,
        OrderRoutingModule
    ],
  declarations: [
        OrderBlockComponent
    ],
  exports:      [ OrderBlockComponent ],
  entryComponents: [ ],
  providers:    [
        WorkoutService,
        OrderService,
        ReservationService,
        CheckoutService,
        SpaceService
    ]
})
export class OrderModule {}
