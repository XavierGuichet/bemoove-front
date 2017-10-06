import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkoutInstance } from '../models/index';
import { WorkoutInstanceApi } from './api-models/workout-instance-api';

@Injectable()
export class WorkoutInstanceService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private headersSearch = new Headers({ Accept: 'application/json'});
    private workoutInstancesUrl = 'http://' + process.env.API_URL + '/workout_instances';
    private searchDate: Date;
    private workoutInstanceApi: WorkoutInstanceApi;

    constructor(private http: Http) { }

    public create(workoutInstance: WorkoutInstance) {
        this.workoutInstanceApi = new WorkoutInstanceApi(workoutInstance);
        return this.http.post(  this.workoutInstancesUrl,
                                this.workoutInstanceApi,
                                this.jwt())
                        .map((response: Response) => response.json());
    }

    public getByWorkoutId(id: number) {
        return this.http.get(this.workoutInstancesUrl + '?workout.id=' + id,
                               { headers: this.headersSearch })
               .toPromise()
               .then((response) => response.json() as WorkoutInstance[])
               .catch(this.handleError);
    }

    public getByCoachIdAndDateInterval(id: number, startdate: Date, lastdate: Date): Promise<WorkoutInstance[]> {
        return this.http.get(this.workoutInstancesUrl + '?coach.id=' + id + '&startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
                            { headers: this.headersSearch })
            .toPromise()
            .then((response) => response.json() as WorkoutInstance[])
            .catch(this.handleError);
    }

    // public delete(id: number): Promise<void> {
    //     const url = `${this.workoutsUrl}/${id}`;
    //     return this.http.delete(url, {headers: this.headers})
    //         .toPromise()
    //         .then(() => null)
    //         .catch(this.handleError);
    // }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
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
