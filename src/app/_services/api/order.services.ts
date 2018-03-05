import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';

import { Person, Order, WorkoutInstance } from '../../models/index';
import { PersonApi } from './api-models/person-api';

@Injectable()
export class OrderService extends ApiService {
    private OrderUrl = process.env.API_URL + '/order';

    constructor(dialog: MatDialog, private http: Http) {
      super(dialog);
    }

    /**
     * Create a Order with OrderState in progress
     * @param workoutInstance The workoutInstance ordered
     * @param nbBooking how many Places will be reserved by order
     *
     * @returns Order
     */
    public makeOrder(workoutInstance: WorkoutInstance, nbBooking: number): Promise<Order> {
        let url = process.env.API_URL + '/makeOrder';
        return this.http.post(url, this.getRequestOptions())
            .toPromise()
            .then( (response) => response.json() as Order)
            .catch( (res) => this.handleError(res, this));
    }

    /**
     * Retrieve last Order of connected User
     * @returns Order
     */
    // public getMyCurrentOrder(): Promise<Order> {
    //
    // }
}
