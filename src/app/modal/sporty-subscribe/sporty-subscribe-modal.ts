import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

@Component({
    // moduleId: module.id,
    selector: 'modal-content',
    templateUrl: 'sporty-subscribe-modal.component.html',
    styleUrls: ['sporty-subscribe-modal.component.css']
})
export class SportySubscribeModalComponent implements CloseGuard, ModalComponent<BSModalContext> {
    public mailsubscriber: string;
    private context: BSModalContext;
    private headers = new Headers({'Content-Type': 'application/json'});
    private nlSubscribeUrl = 'https://www.bemoove.fr/subscribe.php';

    constructor(
        private http: Http,
        public dialog: DialogRef<BSModalContext>
    ) {
        this.context = dialog.context;
        // dialog.setCloseGuard(this);
    }

    public subscribe() {
         this.http.post(this.nlSubscribeUrl,
                        { mail: this.mailsubscriber }, this.headers).toPromise()
                        .then((response: Response) => console.log(response))
         .catch(this.handleError);
         this.dialog.close();
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
