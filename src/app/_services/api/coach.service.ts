import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import { Coach } from '../../models/index';
import { CoachApi } from './api-models/coach-api';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CoachService extends ApiService {
  private CoachesUrl = process.env.API_URL + '/coaches';
  private coachApi: CoachApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getAll(): Promise<Coach[]> {
    return this.http.get(this.CoachesUrl, { headers: this.headers })
      .toPromise()
      .then((response) => response.json() as Coach[])
      .catch((res) => this.handleError(res, this));
  }

  public getById(id: number): Promise<Coach> {
    return this.http.get(this.CoachesUrl + '/' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Coach)
      .catch((res) => this.handleError(res, this));
  }

  public getMyCoaches(): Promise<Coach[]> {
    let url = process.env.API_URL + '/getMyCoaches';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Coach[])
      .catch((res) => this.handleError(res, this));
  }

  public getByBusiness(id: number): Promise<Coach[]> {
    return this.http.get(this.CoachesUrl + '?business.id=' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Coach[])
      .catch((res) => this.handleError(res, this));
  }

  public create(coach: Coach): Promise<Coach> {
    this.coachApi = new CoachApi(coach);
    return this.http.post(this.CoachesUrl, this.coachApi, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Coach)
      .catch((res) => this.handleError(res, this));
  }

  public update(coach: Coach): Promise<Coach> {
    this.coachApi = new CoachApi(coach);
    return this.http.put(this.CoachesUrl + '/' + coach.id, this.coachApi, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Coach)
      .catch((res) => this.handleError(res, this));
  }

  public delete(id: number) {
    return this.http.delete(this.CoachesUrl + '/' + id, this.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
