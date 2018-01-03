import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { WorkoutInstance } from '../../models/index';
import { WorkoutInstanceApi } from './api-models/workout-instance-api';

@Injectable()
export class WorkoutInstanceService extends ApiService {
  private workoutInstancesUrl = process.env.API_URL + '/workout_instances';
  private workoutInstanceApi: WorkoutInstanceApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public create(workoutInstance: WorkoutInstance): Promise<WorkoutInstance> {
    this.workoutInstanceApi = new WorkoutInstanceApi(workoutInstance);
    return this.http.post(this.workoutInstancesUrl,
      this.workoutInstanceApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as WorkoutInstance)
      .catch((res) => this.handleError(res, this));
  }

  public getBookableByWorkoutId(id: number): Promise<WorkoutInstance[]> {
    let url = process.env.API_URL + '/getBookableWorkoutInstance' + '?workout.id=' + id;
    return this.http.get(url,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as WorkoutInstance[])
      .catch((res) => this.handleError(res, this));
  }

  public getByWorkoutId(id: number): Promise<WorkoutInstance[]> {
    return this.http.get(this.workoutInstancesUrl + '?workout.id=' + id,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as WorkoutInstance[])
      .catch((res) => this.handleError(res, this));
  }

  public getByCoachIdAndDateInterval(id: number, startdate: Date, lastdate: Date): Promise<WorkoutInstance[]> {
    return this.http.get(this.workoutInstancesUrl + '?coach.id=' + id + '&startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as WorkoutInstance[])
      .catch((res) => this.handleError(res, this));
  }

  public getWorkoutInstancesByDateInterval(startdate: Date, lastdate: Date): Promise<WorkoutInstance[]> {
    return this.http.get(this.workoutInstancesUrl + '?startdate[after]=' + startdate.toISOString() + '&enddate[before]=' + lastdate.toISOString(),
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as WorkoutInstance[])
      .catch((res) => this.handleError(res, this));
  }
}
