import { Component, OnInit } from '@angular/core';

import { CheckoutService } from '../../_services/checkout.service';
import { PersonService } from '../../../_services/index';

import {
  Cart,
  Workout,
  WorkoutInstance
} from '../../../models/index';

@Component({
  selector: 'summary',
  templateUrl: 'summary.component.html',
})
export class SummaryComponent implements OnInit {
  public cart: Cart;
  public cartTotalAmountTaxIncl: number;
  public cartTotalAmountTaxExcl: number;

  constructor(
    private checkoutService: CheckoutService,
    private personService: PersonService
  ) {
    //
  }

  public ngOnInit() {
    this.checkoutService.getCurrentCart()
      .then( (cart) => {
        this.cart = cart;
        this.calcCartTotalAmountTaxIncl();
      });
  }

  public calcCartTotalAmountTaxIncl() {
      if (this.cart === null) {
        return 0;
      }
      let taxRate = this.cart.workoutInstance.coach.business.vatRate;
      let productPriceTaxExcl = this.cart.workoutInstance.workout.price;
      this.cartTotalAmountTaxExcl = productPriceTaxExcl * this.cart.nbBooking;
      let totalAmountTaxIncl = this.cartTotalAmountTaxExcl * (1 + taxRate / 100);

      this.cartTotalAmountTaxIncl = totalAmountTaxIncl;
  }

  public makeOrder(event) {
    this.checkoutService.createOrderFromCart(this.cart);
  }

  public editMyInformations() {
    this.checkoutService.goToMyInformationsEdition();
  }
}
