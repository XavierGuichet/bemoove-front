import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import { Cart } from '../../models/index';
import { CartApi } from './api-models/cart-api';

import { Observable } from 'rxjs/Observable'; // TODO : check usefullness
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class CartService extends ApiService {
  private cartUrl = process.env.API_URL + '/carts';
  private cartApi: CartApi;
  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getAll(): Promise<Cart[]> {
    return this.http.get(this.cartUrl, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Cart[])
      .catch((res) => this.handleError(res, this));
  }

  public create(cart: Cart): Promise<Cart> {
    this.cartApi = new CartApi(cart);
    return this.http.post(this.cartUrl, this.cartApi, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Cart)
      .catch((res) => this.handleError(res, this));
  }
}
