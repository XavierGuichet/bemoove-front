import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatButtonModule, MatSnackBar } from '@angular/material';

import { RegisterModalComponent  } from '../modal/register-modal.component';

import { AlertService } from '../../../_services/index';

@Component({
    selector: 'register-button',
    templateUrl: 'register-button.component.html',
    styleUrls: ['register-button.component.scss']
})
export class RegisterButtonComponent {
    public showpassword: boolean = false;
    public loading = false;
    public model: any = {};
    @Input()
    public transparent: string;

    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private router: Router,
        private alertService: AlertService) {
    }

    public showRegisterModal() {
        let dialogRef = this.dialog.open(RegisterModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
            // this.selectedOption = result;
        });
    }
}
