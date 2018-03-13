import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Account } from '../models/account';
import { SpaceService } from '../_services/space.service';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  private authentificationUrl = process.env.API_URL + '/login_check';
  private AccountsUrl = process.env.API_URL + '/accounts';

  constructor(
    private http: Http,
    private spaceService: SpaceService
  ) {
  }

  /*
   * Try to register user
   * On succes, try to login
   */
  public register(account: Account): Promise<boolean> {
    return this.http.post(this.AccountsUrl, account, this.getRequestOptions())
      .toPromise()
      .then((response) => {
        return Promise.all([response, this.login(account.email, account.password)]);
      })
      .then((results) => { return results[1]; })
      .catch((res) => this.handleError(res, this));
  }

  public login(email: string, password: string): Promise<boolean> {
    let account = new Account();
    account.email = email;
    account.password = password;
    return this.http.post(this.authentificationUrl,
      account,
      this.getRequestOptions())
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
        return true;
      })
      .catch((res) => this.handleError(res, this));
  }

  public getResetPasswordToken(model: any): Promise<boolean> {
    let url = process.env.API_URL + '/send_forgotten_password_token';
    return this.http.post(url, model, this.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        return true;
      })
      .catch((res) => this.handleError(res, this));
  }

  public changePassword(model: any): Promise<boolean> {
    let url = process.env.API_URL + '/change_forgotten_password';
    return this.http.post(url, model, this.getRequestOptions())
      .toPromise()
      .then((response: Response) => {
        return true;
      })
      .catch((res) => this.handleError(res, this));
  }

  // remove user from local storage to log user out
  public logout() {
    localStorage.removeItem('currentAccount');
    this.spaceService.refreshSpace();
  }

  protected getRequestOptions() {
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    if (currentAccount && currentAccount.token) {
      this.headers.set('Authorization', 'Bearer ' + currentAccount.token);
    } else {
        this.headers.delete('Authorization');
    }
    return new RequestOptions({ headers: this.headers });
  }

  protected handleError(data: any, that: any): Promise<any> {
    let error = data.json();
    that.loading = false;
    if (error.code === 401) {
      return Promise.reject('Echec de l\'identification');
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || data);
  }
}
