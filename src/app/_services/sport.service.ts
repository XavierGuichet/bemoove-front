import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Sport } from '../models/sport';

@Injectable()
export class SportService {
    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    private SportsUrl = 'http://api.bemoove.local/sports';

    constructor(private http: Http) { }

    getAll(): Promise<Sport[]> {
      return this.http.get(this.SportsUrl, this.jwt())
                 .toPromise()
                 .then(response => response.json() as Sport[]);
    }

    getById(id: number) {
        return this.http.get(this.SportsUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(sport: Sport) {
        return this.http.post(this.SportsUrl, sport, this.jwt()).map((response: Response) => response.json());
    }

    update(sport: Sport) {
        return this.http.put(this.SportsUrl + '/' + sport.id, sport, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.SportsUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token , 'Content-Type': 'application/json', 'Accept': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}
