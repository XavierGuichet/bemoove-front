import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import { BillingMandateSign } from '../../models/index';

@Injectable()
export class BillingMandateSignService extends ApiService {
    constructor(dialog: MatDialog, private http: Http) {
      super(dialog);
    }

  public hasSign(): Promise<BillingMandateSign> {
    let url = process.env.API_URL + '/checkBillingMandate';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BillingMandateSign)
      .catch((res) => this.handleError(res, this));
  }

  public sign(): Promise<BillingMandateSign> {
    let url = process.env.API_URL + '/signBillingMandate';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BillingMandateSign)
      .catch((res) => this.handleError(res, this));
  }
}
