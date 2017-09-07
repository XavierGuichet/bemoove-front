import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';

import { Organization } from '../models/organization';
import { BusinessApi } from './api-models/business-api';

@Injectable()
export class BusinessService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private headersSearch = new Headers({Accept: 'application/json'});
    private businessUrl = 'http://' + process.env.API_URL + '/businesses';
    // private legalRepresentativeApi: LegalRepresentativeApi;
    private businessApi: BusinessApi;

    constructor(
            private http: Http) {}

    public update(organization: Organization) {
        this.businessApi = new BusinessApi(organization);
        return this.http.put(   this.businessUrl + '/' + this.businessApi.id,
                                this.businessApi,
                                this.jwt())
                            .map((response: Response) => response.json());
    }

    public getByOwnerId(id: number): Promise<Organization> {
        return this.http.get(this.businessUrl + '?owner.id=' + id, this.jwt())
            .toPromise()
            .then((response) => response.json() as Organization)
            .catch(this.handleError);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        console.log(currentAccount);
        if (currentAccount && currentAccount.token) {
            let headers = new Headers({
                                'Authorization': 'Bearer ' + currentAccount.token,
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
