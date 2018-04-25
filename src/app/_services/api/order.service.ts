import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';

import { Cart, Payment, Person, Order, WorkoutInstance } from '../../models/index';
import { OrderApi } from './api-models/order-api';

@Injectable()
export class OrderService extends ApiService {
    private orderUrl = process.env.API_URL + '/orders';
    private orderApi: OrderApi;

    constructor(dialog: MatDialog, private http: Http) {
      super(dialog);
    }

    /**
     * Create a Order with OrderState 'in progress ?'
     * @param Cart The cart used to create the order
     *
     * @returns Order
     */
    public createOrderFromCart(cart: Cart): Promise<Order> {
        this.orderApi = new OrderApi(cart);
        let url = process.env.API_URL + '/createOrderFromCart';
        return this.http.post(url, this.orderApi,  this.getRequestOptions())
            .toPromise()
            .then( (response) => response.json() as Order)
            .catch( (res) => this.handleError(res, this));
    }

    public payOrder(order: Order): Promise<Order> {
        let puttedOrder = new Order();
        puttedOrder.id = order.id;
        return this.http.put(this.orderUrl + '/' + puttedOrder.id, puttedOrder, this.getRequestOptions())
            .toPromise()
            .then( (response) => response.json() as Order)
            .catch( (res) => this.handleError(res, this));
    }
}
