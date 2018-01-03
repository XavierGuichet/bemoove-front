import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';

import { Business } from '../../models/business';
import { BusinessApi } from './api-models/business-api';

@Injectable()
export class BusinessService extends ApiService {
  private businessUrl = process.env.API_URL + '/businesses';
  private businessApi: BusinessApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public update(Business: Business): Promise<Business> {
    this.businessApi = new BusinessApi(Business);
    return this.http.put(this.businessUrl + '/' + this.businessApi.id,
      this.businessApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Business)
      .catch((res) => this.handleError(res, this));
  }

  public getMyBusiness(): Promise<Business> {
    let url = process.env.API_URL + '/getMyBusiness';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Business)
      .catch((res) => this.handleError(res, this));
  }
}
