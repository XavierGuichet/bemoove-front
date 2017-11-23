import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { BillingMandateSign } from '../models/index';

@Injectable()
export class BillingMandateSignService {
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  });
  constructor(private http: Http) { }

  public hasSign(): Promise<BillingMandateSign> {
    let url = process.env.API_URL + '/checkBillingMandate';
    return this.http.get(url, this.jwt())
      .toPromise()
      .then((response) => response.json() as BillingMandateSign);
  }

  public sign(): Promise<BillingMandateSign> {
    let url = process.env.API_URL + '/signBillingMandate';
    return this.http.get(url, this.jwt())
      .toPromise()
      .then((response) => response.json() as BillingMandateSign)
      .catch(this.handleError);
  }

  private jwt() {
    // create authorization header with jwt token
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    if (currentAccount && currentAccount.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentAccount.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      return new RequestOptions({ headers });
    }
  }

  private handleError(error: any): Promise<any> {
    if (error.code === 401) {
      alert(error.message);
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || error);
  }
}
