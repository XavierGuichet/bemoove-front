import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';

import { LegalRepresentative } from '../models/legal-representative';
import { LegalRepresentativeApi } from './api-models/legal-representative-api';

@Injectable()
export class LegalRepresentativeService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private headersSearch = new Headers({Accept: 'application/json'});
    private legalRepresentativesUrl = 'http://' + process.env.API_URL + '/legal_representative';
    private legalRepresentativeApi: LegalRepresentativeApi;

    constructor(
            private http: Http) {}

    public create(legalRepresentative: LegalRepresentative) {
        this.legalRepresentativeApi = new LegalRepresentativeApi(legalRepresentative);
        return this.http.post(this.legalRepresentativesUrl, this.legalRepresentativeApi, this.jwt()).map(
                                        (response: Response) => response.json()
                                    );
    }

    public update(legalRepresentative: LegalRepresentative) {
        this.legalRepresentativeApi = new LegalRepresentativeApi(legalRepresentative);
        return this.http.put(   this.legalRepresentativesUrl + '/' + legalRepresentative.id,
                                this.legalRepresentativeApi,
                                this.jwt())
                        .map((response: Response) => response.json());
    }

    public getByOwnerId(id: number): Promise<LegalRepresentative> {
        return this.http.get(this.legalRepresentativesUrl + '?owner.id=' + id, this.jwt())
            .toPromise()
            .then((response) => response.json() as LegalRepresentative)
            .catch(this.handleError);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
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
