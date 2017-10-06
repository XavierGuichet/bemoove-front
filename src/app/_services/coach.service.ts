import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Coach } from '../models/index';
import { CoachApi } from './api-models/coach-api';

@Injectable()
export class CoachService {
    private headers = new Headers({'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private CoachesUrl = 'http://' + process.env.API_URL + '/coaches';
    private coachApi: CoachApi;

    constructor(private http: Http) { }

    public getAll(): Promise<Coach[]> {
      return this.http.get(this.CoachesUrl, { headers: this.headers })
                 .toPromise()
                 .then((response) => response.json() as Coach[]);
    }

    public getById(id: number): Promise<Coach> {
        return this.http.get(this.CoachesUrl + '/' + id, this.jwt())
                        .toPromise()
                        .then((response) => response.json() as Coach)
                        .catch(this.handleError);
    }

    public getMyCoaches(): Promise<Coach[]> {
        let url = 'http://' + process.env.API_URL + '/getMyCoaches';
        return this.http.get(url, this.jwt())
                        .toPromise()
                        .then((response) => response.json() as Coach[])
                        .catch(this.handleError);
    }

    public getByBusiness(id: number): Promise<Coach[]> {
        return this.http.get(this.CoachesUrl + '?business.id=' + id, this.jwt())
                        .toPromise()
                        .then((response) => response.json() as Coach[])
                        .catch(this.handleError);
    }

    public create(coach: Coach) {
        this.coachApi = new CoachApi(coach);
        return this.http.post(this.CoachesUrl, this.coachApi, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(coach: Coach) {
        this.coachApi = new CoachApi(coach);
        return this.http.put(this.CoachesUrl + '/' + coach.id, this.coachApi, this.jwt())
                        .map((response: Response) => response.json());
    }

    public delete(id: number) {
        return this.http.delete(this.CoachesUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        if (currentAccount && currentAccount.token) {
            let headers = new Headers({ Authorization: 'Bearer ' + currentAccount.token });
            let options = new RequestOptions();
            options.headers = headers;
            return options;
        }
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
