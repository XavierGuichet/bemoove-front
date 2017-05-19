import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class UserService {
    private headers = new Headers({'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private UsersUrl = 'http://api.bemoove.local/users';

    constructor(private http: Http) { }

    public getAll(): Promise<User[]> {
      return this.http.get(this.UsersUrl, { headers: this.headers })
                 .toPromise()
                 .then((response) => response.json() as User[]);
    }

    public getById(id: number) {
        return this.http.get(this.UsersUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(user: User) {
        return this.http.post(this.UsersUrl, user, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(user: User) {
        return this.http.put(this.UsersUrl + '/' + user.id, user, this.jwt())
                        .map((response: Response) => response.json());
    }

    public delete(id: number) {
        return this.http.delete(this.UsersUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        if (currentUser && currentUser.token) {
            let headers = new Headers({ Authorization: 'Bearer ' + currentUser.token });
            let options = new RequestOptions();
            options.headers = headers;
            return options;
        }
    }
}
