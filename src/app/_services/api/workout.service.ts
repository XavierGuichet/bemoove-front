import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { Workout } from '../../models/workout';
import { WorkoutApi } from './api-models/workout-api';

@Injectable()
export class WorkoutService extends ApiService {
  private workoutsUrl = process.env.API_URL + '/workouts';
  private searchDate: Date;
  private workoutApi: WorkoutApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public create(workout: Workout): Promise<Workout> {
    this.workoutApi = new WorkoutApi(workout);
    return this.http.post(this.workoutsUrl,
      this.workoutApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Workout)
      .catch((res) => this.handleError(res, this));
  }

  public update(workout: Workout): Promise<Workout> {
    this.workoutApi = new WorkoutApi(workout);
    return this.http.put(this.workoutsUrl + '/' + workout.id,
      this.workoutApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Workout)
      .catch((res) => this.handleError(res, this));
  }

  public delete(id: number): Promise<void> {
    const url = `${this.workoutsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch((res) => this.handleError(res, this));
  }

  public getWorkouts(): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl, { headers: this.headers })
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch((res) => this.handleError(res, this));
  }

  // Return workouts of the business assossiated with current connected account
  public getMyWorkouts(): Promise<Workout[]> {
    let url = process.env.API_URL + '/getMyWorkouts';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch((res) => this.handleError(res, this));
  }

  public getWorkout(id: number): Promise<Workout> {
    let url = this.workoutsUrl + '/' + id;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then((response) => response.json() as Workout)
      .catch((res) => this.handleError(res, this));
  }

  public getWorkoutsByCoachIdAndDateInterval(id: number, startdate: Date, lastdate: Date): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl + '?coach.id=' + id + '&startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch((res) => this.handleError(res, this));
  }

  public getWorkoutsByPartnerIdAndDateInterval(id: number, startdate: Date, lastdate: Date): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl + '?owner.id=' + id + '&startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch((res) => this.handleError(res, this));
  }

  public getWorkoutsByDateInterval(startdate: Date, lastdate: Date): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl + '?startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Workout[])
      .catch((res) => this.handleError(res, this));
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
}
