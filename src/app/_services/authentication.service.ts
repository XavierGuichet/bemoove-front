import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from './api/api.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from '../models/account';
import { SpaceService } from '../_services/space.service';

@Injectable()
export class AuthenticationService extends ApiService {
  private authentificationUrl = process.env.API_URL + '/login_check';
  private AccountsUrl = process.env.API_URL + '/accounts';
  private headersspec = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  });

  constructor(
      @Inject(MatDialog) dialog: MatDialog,
      private http: Http,
      private spaceService: SpaceService,
      private router: Router) {
    super(dialog);
  }

  /*
   * Try to register user
   * On succes, try to login and redirect
   */
  public register(account: Account): Promise<boolean> {
    return this.http.post(this.AccountsUrl, account, this.getRequestOptions())
      .toPromise()
      .then((response) => {
          let user = response.json();
          return this.login(account.email, account.password, true);
      })
      .catch((res) => this.handleError(res, this));
  }

  public login(username: string, password: string, redirect: boolean = false): Promise<boolean> {
    return this.http.post(this.authentificationUrl,
      'email=' + username + '&password=' + password,
      this.requestOptions())
      .toPromise()
      .then((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage
          //          to keep user logged in between page refreshes
          localStorage.setItem('currentAccount', JSON.stringify(user));
        }
        this.spaceService.refreshSpace();
        if (redirect === true) {
            return this.redirectAfterLogin();
        }
        return true;
      })
      .catch((res) => this.handleError(res, this));
  }

  // remove user from local storage to log user out
  public logout() {
    localStorage.removeItem('currentAccount');
    this.spaceService.refreshSpace();
  }

  private requestOptions() {
    return new RequestOptions({ headers: this.headersspec });
  }

  private redirectAfterLogin(): boolean {
      let zone = this.spaceService.getZone();
      if (zone === 'ROLE_PARTNER') {
          this.router.navigate(['/partner']);
          return true;
      }
      if (zone === 'ROLE_USER') {
          this.router.navigate(['/member/mon-profil']);
          return true;
      } else {
          console.log('role not defined');
          this.router.navigate(['/workouts/view']);
          return true;
      }
  }

}
