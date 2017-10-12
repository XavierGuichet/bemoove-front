import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';

import { BankAccount } from '../models/bank-account';
import { BankAccountApi } from './api-models/bank-account-api';

@Injectable()
export class BankAccountService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private headersSearch = new Headers({ Accept: 'application/json' });
  private bankAccountsUrl = 'http://' + process.env.API_URL + '/bank_accounts';
  private bankAccountApi: BankAccountApi;

  constructor(
    private http: Http) { }

  public update(bankAccount: BankAccount): Promise<BankAccount> {
    this.bankAccountApi = new BankAccountApi(bankAccount);
    return this.http.put(this.bankAccountsUrl + '/' + bankAccount.id,
      this.bankAccountApi,
      this.jwt())
      .toPromise()
      .then((response) => response.json() as BankAccount)
      .catch(this.handleError);
  }

  public getMyBankAccount(): Promise<BankAccount> {
    let url = 'http://' + process.env.API_URL + '/getMyBankAccount';
    return this.http.get(url, this.jwt())
      .toPromise()
      .then((response) => response.json() as BankAccount)
      .catch(this.handleError);
  }

  private jwt() {
    // create authorization header with jwt token
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    if (currentAccount && currentAccount.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentAccount.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      return new RequestOptions({ headers });
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
