import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { RegisterModalComponent  } from '../../register/modal/register-modal.component';

import { AlertService, AccountService } from '../../../_services/index';

@Component({
    // moduleId: module.id,
    selector: 'login-modal',
    templateUrl: 'login-modal.component.html',
    styleUrls: ['../../modal.component.scss']
})
export class LoginModalComponent {
    public showpassword: boolean = false;
    public loading = false;
    public model: any = {};

    constructor(
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<LoginModalComponent>,
        public snackBar: MdSnackBar,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) {
    }

    public showRegisterModal() {
        this.dialogRef.close();
        let dialogRef = this.dialog.open(RegisterModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
          //   this.selectedOption = result;
        });
    }
}
