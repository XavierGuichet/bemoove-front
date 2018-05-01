import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Order } from '../../../models/index';
import { OrderService } from '../../../_services/index';

@Component({
  selector: 'validation',
  templateUrl: 'validation.component.html',
})
export class ValidationComponent implements OnInit {
  private order: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //
  }

  public ngOnInit() {
    this.route.params
      .switchMap( (params: Params) => this.orderService.checkOrderPayment(+params['id']))
      .subscribe( (order) => {
          this.order = order;
          if (this.isOrderPaid(this.order)) {
            this.router.navigate(['order/checkout/step/success/' + this.order.id]);
          } else {
            this.router.navigate(['order/checkout/step/retry/' + this.order.id]);
          }
      });
  }

  private isOrderPaid(order: Order) {
    return order.statusHistory[order.statusHistory.length - 1].orderState.id === 2;
  }
}
