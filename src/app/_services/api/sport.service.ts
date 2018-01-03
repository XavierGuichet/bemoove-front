import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { Sport } from '../../models/sport';

@Injectable()
export class SportService extends ApiService {
  private SportsUrl = process.env.API_URL + '/sports';

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getAll(): Promise<Sport[]> {
    return this.http.get(this.SportsUrl, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Sport[])
      .catch((res) => this.handleError(res, this));
  }

  public getById(id: number): Promise<Sport> {
    return this.http.get(this.SportsUrl + '/' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Sport)
      .catch((res) => this.handleError(res, this));
  }

  public create(sport: Sport): Promise<Sport> {
    return this.http.post(this.SportsUrl, sport, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Sport)
      .catch((res) => this.handleError(res, this));
  }

  public update(sport: Sport): Promise<Sport> {
    return this.http.put(this.SportsUrl + '/' + sport.id, sport, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Sport)
      .catch((res) => this.handleError(res, this));
  }

  public delete(id: number) {
    return this.http.delete(this.SportsUrl + '/' + id, this.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
