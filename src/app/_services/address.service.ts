import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Address } from '../models/address';

@Injectable()
export class AddressService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private headersSearch = new Headers({Accept: 'application/json'});
    private AddressesUrl = 'http://' + process.env.API_URL + '/addresses';

    constructor(private http: Http) { }

    public getAll(): Promise<Address[]> {
      return this.http.get(this.AddressesUrl, { headers: this.headers })
                 .toPromise()
                 .then((response) => response.json() as Address[]);
    }

    public getAddressesByPartnerId(id: number): Promise<Address[]> {
        return this.http.get(this.AddressesUrl + '?user.id=' + id, this.jwt())
            .toPromise()
            .then((response) => response.json() as Address[])
            .catch(this.handleError);
    }

    public getById(id: number) {
        return this.http.get(this.AddressesUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(address: Address) {
        return this.http.post(this.AddressesUrl, address, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(address: Address) {
        return this.http.put(this.AddressesUrl + '/' + address.id, address, this.jwt())
                        .map((response: Response) => response.json());
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
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentAccount.token,
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json' });
            return new RequestOptions({ headers });
        }
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
