import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { LoginModalComponent  } from '../../login/modal/login-modal.component';

import { AlertService } from '../../../_services/index';

@Component({
    // moduleId: module.id,
    selector: 'register-modal',
    templateUrl: 'register-modal.component.html',
    styleUrls: ['../../modal.component.scss']
})
export class RegisterModalComponent {
    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<RegisterModalComponent>,
        public snackBar: MatSnackBar,
        private router: Router,
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
