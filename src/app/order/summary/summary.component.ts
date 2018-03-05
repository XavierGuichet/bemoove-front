import { Component, Input } from '@angular/core';

import {
  Cart,
  Workout,
  WorkoutInstance
} from '../../models/index';

@Component({
  selector: 'order-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class OrderSummaryComponent {
    @Input()
    public cart: Cart;

  constructor(
  ) {
      // TODO : constructor
  }
}
