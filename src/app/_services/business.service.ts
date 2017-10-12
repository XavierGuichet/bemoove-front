import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';

import { Business } from '../models/business';
import { BusinessApi } from './api-models/business-api';

@Injectable()
export class BusinessService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private headersSearch = new Headers({ Accept: 'application/json' });
  private businessUrl = 'http://' + process.env.API_URL + '/businesses';
  // private legalRepresentativeApi: LegalRepresentativeApi;
  private businessApi: BusinessApi;

  constructor(
    private http: Http) { }

  public update(Business: Business): Promise<Business> {
    this.businessApi = new BusinessApi(Business);
    return this.http.put(this.businessUrl + '/' + this.businessApi.id,
      this.businessApi,
      this.jwt())
      .toPromise()
      .then((response) => response.json() as Business)
      .catch(this.handleError);
  }

  public getMyBusiness(): Promise<Business> {
    let url = 'http://' + process.env.API_URL + '/getMyBusiness';
    return this.http.get(url, this.jwt())
      .toPromise()
      .then((response) => response.json() as Business)
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
