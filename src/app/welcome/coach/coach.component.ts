import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SportySubscribeModalComponent } from '../../modal/sporty-subscribe/sporty-subscribe-modal';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'welcome-coach',
    templateUrl: 'coach.component.html',
    styleUrls: ['coach.component.scss']
})

export class WelcomeCoachComponent implements OnInit {
    public name: string;
    public mail: string;
    public phone: string;
    public success: boolean = false;

    private headers = new Headers({'Content-Type': 'application/json'});
    private callMeBackUrl = 'https://www.bemoove.fr/callmeback.php';

    constructor(
        public dialog: MdDialog,
        private router: Router,
        private http: Http,
        private spaceService: SpaceService
    ) {
    }

    public ngOnInit() {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(true);
    }

    public showJoinUs() {
      let dialogRef = this.dialog.open(SportySubscribeModalComponent);
      dialogRef.afterClosed().subscribe((result) => {
        //   this.selectedOption = result;
      });
    }

    public callmeback() {
         this.http.post(this.callMeBackUrl,
                        {   name: this.name,
                            mail: this.mail,
                            phone: this.phone  },
                        this.headers).toPromise()
                        .then((response: Response) => console.log(response))
                        .catch(this.handleError);
         this.success = true;
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
