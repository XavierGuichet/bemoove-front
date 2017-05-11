import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { RegisterModalComponent  } from '../register/register-modal.component';

import { AlertService, AuthenticationService } from '../../_services/index';
import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'login-modal',
    templateUrl: 'login-modal.component.html',
    styleUrls: ['../modal.component.scss']
})
export class LoginModalComponent {
    public model: any = {};
    public loading = false;
    private returnUrl: string;

    constructor(
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<LoginModalComponent>,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spaceService: SpaceService) {
    }

    public login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                (data) => {
                    this.dialogRef.close();
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

    public showRegisterModal() {
        let dialogRef = this.dialog.open(RegisterModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
          //   this.selectedOption = result;
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
