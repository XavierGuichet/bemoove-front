import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { Address } from '../../models/address';

@Injectable()
export class AddressService extends ApiService {
  private AddressesUrl = process.env.API_URL + '/addresses';

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getMyWorkoutAdresses(): Promise<Address[]> {
    let url = process.env.API_URL + '/getMyWorkoutAddress';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Address[])
      .catch((res) => this.handleError(res, this));
  }

  public getById(id: number): Promise<Address> {
    return this.http.get(this.AddressesUrl + '/' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Address)
      .catch((res) => this.handleError(res, this));
  }

  public create(address: Address): Promise<Address> {
    return this.http.post(this.AddressesUrl, address, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Address)
      .catch((res) => this.handleError(res, this));
  }

  public update(address: Address): Promise<Address> {
    return this.http.put(this.AddressesUrl + '/' + address.id, address, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Address)
      .catch((res) => this.handleError(res, this));
  }

  public delete(id: number) {
    return this.http.delete(this.AddressesUrl + '/' + id, this.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
