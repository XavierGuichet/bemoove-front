import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { LoginModalComponent  } from '../modal/login-modal.component';

import { AlertService } from '../../../_services/index';

@Component({
    selector: 'login-button',
    templateUrl: 'login-button.component.html',
    styleUrls: ['login-button.component.scss']
})
export class LoginButtonComponent {
    public showpassword: boolean = false;
    public loading = false;
    public model: any = {};
    @Input()
    public transparent: boolean;

    constructor(
        public dialog: MdDialog,
        public snackBar: MdSnackBar,
        private router: Router,
        private alertService: AlertService) {
    }

    public showLoginModal() {
        let dialogRef = this.dialog.open(LoginModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
            // this.selectedOption = result;
        });
    }
}
