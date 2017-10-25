import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Address } from '../models/address';

@Injectable()
export class AddressService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private headersSearch = new Headers({ Accept: 'application/json' });
  private AddressesUrl = 'http://' + process.env.API_URL + '/addresses';

  constructor(private http: Http) { }

  public getMyWorkoutAdresses(): Promise<Address[]> {
    let url = 'http://' + process.env.API_URL + '/getMyWorkoutAddress';
    return this.http.get(url, this.jwt())
      .toPromise()
      .then((response) => response.json() as Address[])
      .catch(this.handleError);
  }

  public getById(id: number) {
    return this.http.get(this.AddressesUrl + '/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  public create(address: Address): Promise<Address> {
    return this.http.post(this.AddressesUrl, address, this.jwt())
      .toPromise()
      .then((response) => response.json() as Address)
      .catch(this.handleError);
  }

  public update(address: Address): Promise<Address> {
    return this.http.put(this.AddressesUrl + '/' + address.id, address, this.jwt())
      .toPromise()
      .then((response) => response.json() as Address)
      .catch(this.handleError);
  }

  public delete(id: number) {
    return this.http.delete(this.AddressesUrl + '/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  // private helper methods
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
