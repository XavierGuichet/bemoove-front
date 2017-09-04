import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Profile } from '../models/profile';

@Injectable()
export class ProfileService {
    private headers = new Headers({'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private ProfilesUrl = 'http://' + process.env.API_URL + '/profiles';

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

    public getByUserId(id: number) {
        return this.http.get(this.ProfilesUrl + '?user.id=' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(profile: Profile) {
        return this.http.post(this.ProfilesUrl, profile, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(profile: Profile) {
        return this.http.put(this.ProfilesUrl + '/' + profile.id, profile, this.jwt())
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
}