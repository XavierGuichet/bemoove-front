import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workout } from '../models/workout';
import { WorkoutApi } from './api-models/workout-api';

@Injectable()
export class WorkoutService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private headersSearch = new Headers({ Accept: 'application/json' });
  private workoutsUrl = process.env.API_URL + '/workouts';
  private searchDate: Date;
  private workoutApi: WorkoutApi;

  constructor(private http: Http) { }

  public create(workout: Workout): Promise<Workout> {
    this.workoutApi = new WorkoutApi(workout);
    return this.http.post(this.workoutsUrl,
      this.workoutApi,
      this.jwt())
      .toPromise()
      .then((response) => response.json() as Workout)
      .catch(this.handleError);
  }

  public update(workout: Workout): Promise<Workout> {
    this.workoutApi = new WorkoutApi(workout);
    return this.http.put(this.workoutsUrl + '/' + workout.id,
      this.workoutApi,
      this.jwt())
      .toPromise()
      .then((response) => response.json() as Workout)
      .catch(this.handleError);
  }

  public delete(id: number): Promise<void> {
    const url = `${this.workoutsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
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

  // Return workouts of the business assossiated with current connected account
  public getMyWorkouts(): Promise<Workout[]> {
    let url = process.env.API_URL + '/getMyWorkouts';
    return this.http.get(url, this.jwt())
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch(this.handleError);
  }

  public getWorkout(id: number): Promise<Workout> {
    let url = this.workoutsUrl + '/' + id;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then((response) => response.json() as Workout)
      .catch(this.handleError);
  }

  public getWorkoutsByCoachIdAndDateInterval(id: number, startdate: Date, lastdate: Date): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl + '?coach.id=' + id + '&startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      { headers: this.headersSearch })
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch(this.handleError);
  }

  public getWorkoutsByPartnerIdAndDateInterval(id: number, startdate: Date, lastdate: Date): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl + '?owner.id=' + id + '&startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      { headers: this.headersSearch })
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch(this.handleError);
  }

  public getWorkoutsByDateInterval(startdate: Date, lastdate: Date): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl + '?startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      { headers: this.headersSearch })
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch(this.handleError);
  }

  public getWorkoutByDay(date: Date): Promise<Workout[]> {
    return this.getWorkouts()
      .then((workouts) => workouts.filter(
        (workout) =>
          1
        // date.getDate() === new Date( workout.startdate ).getDate()
      ));
  }

  private passedDate(workout, i, o): any {
    let workoutStartDateTime = new Date(workout.startdate).getTime();
    let currentTime = new Date().getTime();
    return currentTime > workoutStartDateTime;
  }

  private futureDate(workout, i, o): any {
    let workoutStartDateTime = new Date(workout.startdate).getTime();
    let currentTime = new Date().getTime();
    return currentTime < workoutStartDateTime;
  }

  private dateComparaison(workout, i, o): any {
    let workoutStartDate = new Date(workout.startdate);
    return this.searchDate.getDate() === workoutStartDate.getDate();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private jwt() {
    // create authorization header with jwt token
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    if (currentAccount && currentAccount.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentAccount.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      return new RequestOptions({ headers });
    }
  }

  private handleError(error: any): Promise<any> {
    if (error.code === 401) {
      alert(error.message);
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || error);
  }
}
