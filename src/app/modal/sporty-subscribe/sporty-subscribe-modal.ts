import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import 'rxjs/add/operator/toPromise';

@Component({
    // moduleId: module.id,
    selector: 'modal-content',
    templateUrl: 'sporty-subscribe-modal.component.html',
    styleUrls: ['sporty-subscribe-modal.component.scss']
})
export class SportySubscribeModalComponent {
    public mailsubscriber: string;
    private headers = new Headers({'Content-Type': 'application/json'});
    private nlSubscribeUrl = 'https://www.bemoove.fr/subscribe.php';

    constructor(
        private http: Http,
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<SportySubscribeModalComponent>,
    ) {
    }

    public subscribe() {
         this.http.post(this.nlSubscribeUrl,
                        { mail: this.mailsubscriber }, this.headers).toPromise()
                        .then((response: Response) => console.log(response))
         .catch(this.handleError);
         this.dialogRef.close();
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    // onKeyUp(value) {
    //     console.log("keyup");
    //     this.dialog.close();
    // }
    //
    //
    // beforeDismiss(): boolean {
    //     console.log("beforeDismiss");
    //     return true;
    // }
    //
    // beforeClose(): boolean {
    //     console.log("beforeClose");
    //     return true;
    // }
}
