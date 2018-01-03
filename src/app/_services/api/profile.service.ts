import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { Profile } from '../../models/profile';
import { ProfileApi } from './api-models/profile-api';

@Injectable()
export class ProfileService extends ApiService {
  private ProfilesUrl = process.env.API_URL + '/profiles';
  private profileApi: ProfileApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getAll(): Promise<Profile[]> {
    return this.http.get(this.ProfilesUrl, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Profile[])
      .catch((res) => this.handleError(res, this));
  }

  public getById(id: number): Promise<Profile> {
    return this.http.get(this.ProfilesUrl + '/' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Profile)
      .catch((res) => this.handleError(res, this));
  }

  public getByOwnerId(id: number): Promise<Profile> {
    return this.http.get(this.ProfilesUrl + '?owner.id=' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Profile)
      .catch((res) => this.handleError(res, this));
  }

  public create(profile: Profile): Promise<Profile> {
    return this.http.post(this.ProfilesUrl, profile, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Profile)
      .catch((res) => this.handleError(res, this));
  }

  public update(profile: Profile): Promise<Profile> {
    this.profileApi = new ProfileApi(profile);
    return this.http.put(this.ProfilesUrl + '/' + this.profileApi.id, this.profileApi, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Profile)
      .catch((res) => this.handleError(res, this));
  }

  public delete(id: number) {
    return this.http.delete(this.ProfilesUrl + '/' + id, this.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
