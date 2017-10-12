import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Profile } from '../models/profile';
import { ProfileApi } from './api-models/profile-api';

@Injectable()
export class ProfileService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private ProfilesUrl = 'http://' + process.env.API_URL + '/profiles';
  private profileApi: ProfileApi;

  constructor(private http: Http) { }

  public getAll(): Promise<Profile[]> {
    return this.http.get(this.ProfilesUrl, { headers: this.headers })
      .toPromise()
      .then((response) => response.json() as Profile[]);
  }

  public getById(id: number) {
    return this.http.get(this.ProfilesUrl + '/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  public getByOwnerId(id: number): Promise<Profile> {
    return this.http.get(this.ProfilesUrl + '?owner.id=' + id, this.jwt())
      .toPromise()
      .then((response) => response.json() as Profile)
      .catch(this.handleError);
  }

  public create(profile: Profile) {
    return this.http.post(this.ProfilesUrl, profile, this.jwt())
      .map((response: Response) => response.json());
  }

  public update(profile: Profile) {
    this.profileApi = new ProfileApi(profile);
    return this.http.put(this.ProfilesUrl + '/' + this.profileApi.id, this.profileApi, this.jwt())
      .map((response: Response) => response.json());
  }

  public delete(id: number) {
    return this.http.delete(this.ProfilesUrl + '/' + id, this.jwt())
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
    if (error.code === 401) {
      alert(error.message);
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || error);
  }
}
