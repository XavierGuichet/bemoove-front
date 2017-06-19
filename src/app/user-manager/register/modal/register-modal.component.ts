import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { LoginModalComponent  } from '../../login/modal/login-modal.component';

import { AlertService, UserService } from '../../../_services/index';

@Component({
    // moduleId: module.id,
    selector: 'register-modal',
    templateUrl: 'register-modal.component.html',
    styleUrls: ['../../modal.component.scss']
})
export class RegisterModalComponent {
    constructor(
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<RegisterModalComponent>,
        public snackBar: MdSnackBar,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
    }

    public showLoginModal() {
        this.dialogRef.close();
        let dialogRef = this.dialog.open(LoginModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
          //   this.selectedOption = result;
        });
    }
}
