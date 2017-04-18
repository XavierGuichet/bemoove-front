import { Injectable }   from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workout } from '../models/workout';

@Injectable()
export class WorkoutService {
    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    private headers_search = new Headers({'Accept': 'application/json'});
    private workoutsUrl = 'http://api.bemoove.local/workouts';
    private searchDate: Date;

    constructor(private http: Http) { }

    getWorkouts(): Promise<Workout[]> {
      return this.http.get(this.workoutsUrl, { headers: this.headers })
                 .toPromise()
                //  .then(response => console.log(response.json()))
                 .then(response => response.json() as Workout[])
                 .catch(this.handleError);
    }


    getWorkout(id: number): Promise<Workout> {
        return this.getWorkouts()
            .then(workouts => workouts.find(workout => workout.id === id));
    }

    getCommingWorkoutByCoachId(id: number): Promise<Workout[]> {
        return this.http.get(this.workoutsUrl + '?coach.id='+id, { headers: this.headers_search })
            .toPromise()
            .then(response => response.json() as Workout[])
            .catch(this.handleError);
    }

    getPastWorkoutByCoachId(id: number): Promise<Workout[]> {
        return this.getWorkouts()
            .then(workouts => workouts.filter(workout => workout.coach === id))
            .then(workouts => workouts.filter(this.passedDate));
    }

    getWorkoutByDay(date: Date): Promise<Workout[]> {
        return this.getWorkouts()
            .then(workouts => workouts.filter(
                workout => date.getDate() === new Date(workout.startdate).getDate() ));
    }

    passedDate(workout, i, o): any {
        let workoutStartDateTime = new Date(workout.startdate).getTime();
        let currentTime = new Date().getTime();
        return currentTime > workoutStartDateTime;
    }

    futureDate(workout, i, o): any {
        let workoutStartDateTime = new Date(workout.startdate).getTime();
        let currentTime = new Date().getTime();
        return currentTime < workoutStartDateTime;
    }

    dateComparaison(workout, i, o): any {
        let workoutStartDate = new Date(workout.startdate);
        return this.searchDate.getDate() === workoutStartDate.getDate();
    }

    create(workout: Workout) {
        if(workout.sport.id) {
            workout.sport = "/sports/"+workout.sport.id;
        }
        if(workout.address.id) {
            workout.address = "/addresses/"+workout.address.id;
        }
        workout.tags = new Array();
        for(var i = 0; i < workout.addedExistingTags.length; i++) {
            workout.tags.push("/tags/"+workout.addedExistingTags[i].id)
        }
        workout.tags = workout.tags.concat(workout.addedNewTags);
        return this.http.post(this.workoutsUrl, workout, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number): Promise<void> {
        const url = `${this.workoutsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

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
