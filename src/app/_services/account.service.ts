import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Account } from '../models/account';

@Injectable()
export class AccountService {
    private headers = new Headers({'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private AccountsUrl = 'http://' + process.env.API_URL + '/accounts';

    constructor(private http: Http) { }

    public getAll(): Promise<Account[]> {
      return this.http.get(this.AccountsUrl, { headers: this.headers })
                 .toPromise()
                 .then((response) => response.json() as Account[]);
    }

    public getById(id: number) {
        return this.http.get(this.AccountsUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(account: Account) {
        return this.http.post(this.AccountsUrl, account, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(account: Account) {
        return this.http.put(this.AccountsUrl + '/' + account.id, account, this.jwt())
                        .map((response: Response) => response.json());
    }

    public delete(id: number) {
        return this.http.delete(this.AccountsUrl + '/' + id, this.jwt())
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
