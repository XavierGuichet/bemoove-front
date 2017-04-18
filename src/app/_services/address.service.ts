import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Address } from '../models/address';

@Injectable()
export class AddressService {
    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    private headers_search = new Headers({'Accept': 'application/json'});
    private AddressesUrl = 'http://api.bemoove.local/addresses';

    constructor(private http: Http) { }

    getAll(): Promise<Address[]> {
      return this.http.get(this.AddressesUrl, { headers: this.headers })
                 .toPromise()
                 .then(response => response.json() as Address[]);
    }

    getAddressesByCoachId(id: number): Promise<Address[]> {
        return this.http.get(this.AddressesUrl + '?user.id='+id, this.jwt())
            .toPromise()
            .then(response => response.json() as Address[])
            .catch(this.handleError);
    }

    getById(id: number) {
        return this.http.get(this.AddressesUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(address: Address) {
        return this.http.post(this.AddressesUrl, address, this.jwt()).map((response: Response) => response.json());
    }

    update(address: Address) {
        return this.http.put(this.AddressesUrl + '/' + address.id, address, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.AddressesUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type': 'application/json', 'Accept': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
