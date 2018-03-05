import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountManagerModule } from '../account-manager/account-manager.module';
import { OrderBlockComponent } from './block/order-block.component';
import { OrderCheckOutComponent } from './checkout/order-checkout.component';
import { OrderRoutingModule } from './order-routing.module';

import { UserInformationFormComponent } from './form/user-information/user-information-form.component';
import { OrderPaymentFormComponent } from './form/payment/payment.component';
import { OrderSummaryComponent } from './summary/summary.component';
import { OrderSuccessComponent } from './success/success.component';

import { WorkoutService, ReservationService, SpaceService } from '../_services/index';

@NgModule({
    bootstrap: [

    ],
  imports:      [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AccountManagerModule,
        OrderRoutingModule
    ],
  declarations: [
        OrderBlockComponent,
        OrderCheckOutComponent,
        UserInformationFormComponent,
        OrderPaymentFormComponent,
        OrderSummaryComponent,
        OrderSuccessComponent
    ],
  exports:      [ OrderBlockComponent ],
  entryComponents: [ ],
  providers:    [
        WorkoutService,
        ReservationService,
        SpaceService
    ]
})
export class OrderModule { }
