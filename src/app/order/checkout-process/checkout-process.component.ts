import { Component, ViewEncapsulation, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
//
// import { AccountManagerModule } from '../../account-manager/account-manager.module';

import { Cart } from '../../models/index';
import { CheckoutService } from '../_services/checkout.service';
import { SpaceService } from '../../_services/index';

@Component({
  selector: 'checkout-process',
  encapsulation: ViewEncapsulation.None,
  template: `
  <main>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1><mat-icon class="mat-18">lock</mat-icon> Reservation en ligne</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-4">
              Confiance 1
            </div>
            <div class="col-sm-4">
              Confiance 2
            </div>
            <div class="col-sm-4">
              Confiance 3
            </div>
          </div>
          <router-outlet class="row"></router-outlet>
        </div>
        <div class="col-sm-3">
          <workout-summary *ngIf="cart" [workoutInstance]="cart.workoutInstance"></workout-summary>
        </div>
      </div>
    </div>
  </main>
  `,
  styleUrls: ['./checkout-process.component.scss']
})

export class CheckoutProcesComponent implements OnInit {
  public cart: Cart;
  constructor(
    private checkoutService: CheckoutService,
    private spaceService: SpaceService
  ) {
  }

  public ngOnInit(): void {
    this.spaceService.toggleTopBar(false);
    this.spaceService.setHeaderAbove(false);
    this.checkoutService.getCurrentCart().then((cart) => this.cart = cart);
  }
}
