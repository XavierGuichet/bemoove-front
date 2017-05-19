import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workout } from '../models/workout';

@Injectable()
export class WorkoutService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private headersSearch = new Headers({ Accept: 'application/json'});
    private workoutsUrl = 'http://api.bemoove.local/workouts';
    private searchDate: Date;

    constructor(private http: Http) { }

    public create(workout: Workout) {
        if ( workout.sport.id ) {
            workout.sport = '/sports/' + workout.sport.id;
        }
        if ( workout.address.id ) {
            workout.address = '/addresses/' + workout.address.id;
        }
        if ( workout.photo.id ) {
            workout.photo = '/images/' + workout.photo.id;
        }
        workout.tags = new Array();
        for ( let addedExistingTag of workout.addedExistingTags ) {
            workout.tags.push('/tags/' + addedExistingTag.id);
        }
        workout.tags = workout.tags.concat(workout.addedNewTags);
        return this.http.post(  this.workoutsUrl,
                                workout,
                                this.jwt())
                        .map((response: Response) => response.json());
    }

    public delete(id: number): Promise<void> {
        const url = `${this.workoutsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    public getWorkouts(): Promise<Workout[]> {
      return this.http.get(this.workoutsUrl, { headers: this.headers })
                 .toPromise()
                 .then((response) => response.json() as Workout[])
                 .catch(this.handleError);
    }

    public getWorkout(id: number): Promise<Workout> {
        return this.getWorkouts()
            .then((workouts) => workouts.find((workout) => workout.id === id));
    }

    public getCommingWorkoutByCoachId(id: number): Promise<Workout[]> {
        return this.http.get(this.workoutsUrl + '?coach.id=' + id,
                            { headers: this.headersSearch })
            .toPromise()
            .then((response) => response.json() as Workout[])
            .catch(this.handleError);
    }

    public getPastWorkoutByCoachId(id: number): Promise<Workout[]> {
        return this.getWorkouts()
            .then((workouts) => workouts.filter((workout) => workout.coach === id))
            .then((workouts) => workouts.filter(this.passedDate));
    }

    public getWorkoutByDay(date: Date): Promise<Workout[]> {
        return this.getWorkouts()
            .then((workouts) => workouts.filter(
                (workout) =>
                    date.getDate() === new Date( workout.startdate ).getDate() ));
    }

    private passedDate(workout, i, o): any {
        let workoutStartDateTime = new Date( workout.startdate ).getTime();
        let currentTime = new Date().getTime();
        return currentTime > workoutStartDateTime;
    }

    private futureDate(workout, i, o): any {
        let workoutStartDateTime = new Date( workout.startdate ).getTime();
        let currentTime = new Date().getTime();
        return currentTime < workoutStartDateTime;
    }

    private dateComparaison(workout, i, o): any {
        let workoutStartDate = new Date( workout.startdate );
        return this.searchDate.getDate() === workoutStartDate.getDate();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'Authorization': 'Bearer ' + currentUser.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json' });
            // fixme : above is not accepted by linter, don't know if it work now
            // should be test and understood
            // return new RequestOptions({ headers: headers });
            return new RequestOptions({ headers });
        }
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
