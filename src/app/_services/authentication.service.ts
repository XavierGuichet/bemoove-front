import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { JwtHelper } from 'angular2-jwt';

import { Account } from '../models/account';
import { SpaceService } from '../_services/space.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private jwtHelper: JwtHelper = new JwtHelper();
    private headers = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'});
    private authentificationUrl = 'http://' + process.env.API_URL + '/login_check';

    // below are Header from account service
    // private headers = new Headers({'Content-Type': 'application/json',
    //                                 'Accept': 'application/json'});
    private AccountsUrl = 'http://' + process.env.API_URL + '/accounts';

    constructor(private http: Http, private spaceService: SpaceService) { }

    public register(account: Account) {
        return this.http.post(this.AccountsUrl, account, this.jwt())
                        .map((response: Response) => response.json());
    }

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
                    localStorage.setItem('currentAccount', JSON.stringify(user));
                }
                this.spaceService.refreshSpace();
            });
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAccount');
        this.spaceService.refreshSpace();
    }

    private requestOptions() {
        return new RequestOptions({ headers: this.headers });
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
