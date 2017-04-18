import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { JwtHelper } from 'angular2-jwt';
import { SpaceService } from '../_services/space.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private jwtHelper: JwtHelper = new JwtHelper();
    private headers = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'});
    private authentificationUrl = 'http://api.bemoove.local/login_check';
    constructor(private http: Http, private spaceService: SpaceService) { }

    public login(username: string, password: string) {
        return this.http.post( this.authentificationUrl,
                            'email=' + username + '&password=' + password,
                            this.requestOptions())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage
                    //          to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.spaceService.refreshSpace();
            });
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.spaceService.refreshSpace();
    }

    private requestOptions() {
        return new RequestOptions({ headers: this.headers });
    }
}
