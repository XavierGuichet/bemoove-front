import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { RegisterModalComponent  } from '../../register/modal/register-modal.component';

import { AlertService } from '../../../_services/index';

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
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<LoginModalComponent>,
        public snackBar: MatSnackBar,
        private router: Router,
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
