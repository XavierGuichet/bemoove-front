import { Component, OnInit } from '@angular/core';

import { Person } from '../../../models/index';
import { CheckoutService } from '../../_services/checkout.service';
import { PersonService } from '../../../_services/index';

@Component({
  selector: 'informations',
  templateUrl: 'informations.component.html'
})
export class InformationsComponent implements OnInit {
  public person: Person;

  constructor(
    private checkoutService: CheckoutService,
    private personService: PersonService
  ) { }

  public ngOnInit() {
    this.checkoutService.getCurrentCart()
      .then((cart) => {
        this.person = cart.member;
      })
      .catch(() => {});
  }

  public goToNextStep(event) {
    if (event === true) {
      this.checkoutService.goToNextStep();
    }
  }
}
