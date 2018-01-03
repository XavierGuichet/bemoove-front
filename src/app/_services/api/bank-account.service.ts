import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';

import { BankAccount } from '../../models/bank-account';
import { BankAccountApi } from './api-models/bank-account-api';

@Injectable()
export class BankAccountService extends ApiService {
  private bankAccountsUrl = process.env.API_URL + '/bank_accounts';
  private bankAccountApi: BankAccountApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public update(bankAccount: BankAccount): Promise<BankAccount> {
    this.bankAccountApi = new BankAccountApi(bankAccount);
    return this.http.put(this.bankAccountsUrl + '/' + bankAccount.id,
      this.bankAccountApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BankAccount)
      .catch((res) => this.handleError(res, this));
  }

  public getMyBankAccount(): Promise<BankAccount> {
    let url = process.env.API_URL + '/getMyBankAccount';
    return this.http.get(url, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BankAccount)
      .catch((res) => this.handleError(res, this));
  }
}
