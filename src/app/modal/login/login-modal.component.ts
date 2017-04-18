import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../_services/index';
import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'login-modal',
    templateUrl: 'login-modal.component.html',
    styleUrls: ['login-modal.component.css']
})
export class LoginModalComponent implements CloseGuard, ModalComponent<BSModalContext> {
    public model: any = {};
    public loading = false;
    private context: BSModalContext;
    private returnUrl: string;

    constructor(public dialog: DialogRef<BSModalContext>,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService,
                private spaceService: SpaceService) {
        this.context = dialog.context;
        // dialog.setCloseGuard(this);
    }

    public login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                (data) => {
                    this.dialog.close();
                    let zone = this.spaceService.getZone();
                    if (zone === 'ROLE_COACH') {
                        this.router.navigate(['/coach']);
                        return;
                    }
                    if (zone === 'ROLE_USER') {
                        this.router.navigate(['/user']);
                        return;
                    }
                    this.router.navigate(['/search']);
                },
                (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                });
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
