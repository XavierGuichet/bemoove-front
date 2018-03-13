import { Headers, RequestOptions } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LoginModalComponent  } from '../../account-manager/login/modal/login-modal.component';

export abstract class ApiService {
  protected headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(protected dialog: MatDialog) {
  }

  protected getRequestOptions() {
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    if (currentAccount && currentAccount.token) {
      this.headers.set('Authorization', 'Bearer ' + currentAccount.token);
      } else {
          this.headers.delete('Authorization');
      }
    return new RequestOptions( { headers: this.headers} );
  }

  protected handleError(data: any, that: any): Promise<any> {
    let error = data.json();
    if (error.code === 401) {
        that.openRegisterModal();
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || data);
  }

  protected openRegisterModal() {
      let dialogRef = this.dialog.open(LoginModalComponent);
  }
}
