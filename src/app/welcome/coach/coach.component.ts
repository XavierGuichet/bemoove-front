import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router }   from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { SportySubscribeModalComponent  }
                from '../../modal/sporty-subscribe/sporty-subscribe-modal';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'welcome-coach',
    providers: [Modal],
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
        overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
        private router: Router,
        private http: Http,
        private spaceService: SpaceService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    public ngOnInit() {
        this.spaceService.toggleTopBar(false);
        // this.spaceService.setLogged(false);
        // this.spaceService.setZone("ROLE_COACH");
    }

    public showJoinUs() {
        return this.modal.open(
            SportySubscribeModalComponent,
            overlayConfigFactory({ showClose: false, isBlocking: false},
                                    BSModalContext));
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
