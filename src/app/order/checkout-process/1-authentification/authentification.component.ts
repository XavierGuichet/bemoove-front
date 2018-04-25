import { Component } from '@angular/core';

import { CheckoutService } from '../../_services/checkout.service';

@Component({
  selector: 'authentification',
  templateUrl: 'authentification.component.html',
})
export class AuthentificationComponent {
  constructor(
    private checkoutService: CheckoutService
  ) {
    //
  }

  public goToNextStep(event) {
    if (event === true) {
      this.checkoutService.goToNextStep();
    }
  }
}
