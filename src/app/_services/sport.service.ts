import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Sport } from '../models/sport';

@Injectable()
export class SportService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private SportsUrl = 'http://' + process.env.API_URL + '/sports';

    constructor(private http: Http) { }

    public getAll(): Promise<Sport[]> {
      return this.http.get(this.SportsUrl, this.jwt())
                 .toPromise()
                 .then((response) => response.json() as Sport[]);
    }

    public getById(id: number) {
        return this.http.get(this.SportsUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(sport: Sport) {
        return this.http.post(this.SportsUrl, sport, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(sport: Sport) {
        return this.http.put(this.SportsUrl + '/' + sport.id, sport, this.jwt())
                        .map((response: Response) => response.json());
    }

    public delete(id: number) {
        return this.http.delete(this.SportsUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        if (currentAccount && currentAccount.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentAccount.token ,
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json' });
            return new RequestOptions({ headers });
        }
    }
}
