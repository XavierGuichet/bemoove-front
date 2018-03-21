import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AccountManagerModule } from '../../account-manager/account-manager.module';

import { Cart, Order } from '../../models/index';

import { CartService, OrderService, SpaceService } from '../../_services/index';

@Component({
  selector: 'order-checkout',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})

export class OrderCheckOutComponent implements OnInit {
  public currentStep: number = 1;
  public cart: Cart;
  public order: Order;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private spaceService: SpaceService
  ) {
  }

  public ngOnInit(): void {
    this.spaceService.toggleTopBar(false);
    this.spaceService.setHeaderAbove(false);
    if (this.spaceService.getLogged() === true) {
      this.goToStep2(true);
    }
  }

  public goToStep2(event) {
    if (event === true) {
      this.cartService.getMyCurrentCart()
        .then((cart) => {
          this.cart = cart;
          this.currentStep = 2;
          // i've got the cart
          // if user data are fine i can create the order
          // and i can go to step 3
        });

    }
  }

  public goToStep3(event) {
    if (event === true) {
      this.currentStep = 3;
    }
  }
}
