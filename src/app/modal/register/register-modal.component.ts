import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { LoginModalComponent  } from '../login/login-modal.component';

import { AlertService, UserService } from '../../_services/index';

@Component({
    // moduleId: module.id,
    selector: 'register-modal',
    templateUrl: 'register-modal.component.html',
    styleUrls: ['../modal.component.scss']
})
export class RegisterModalComponent {
    public showpassword: boolean = true;
    public loading = false;
    public model: any = {};

    constructor(
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<LoginModalComponent>,
        public snackBar: MdSnackBar,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
    }

    public register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                (data) => {
                    this.alertService.success('Registration successful', true);
                    this.snackBar.open('Inscription réussie', '', {
                      duration: 10000,
                    });
                    this.dialogRef.close();
                },
                (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public showLoginModal() {
        this.dialogRef.close();
        let dialogRef = this.dialog.open(LoginModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
          //   this.selectedOption = result;
        });
    }

    public passwordToggle() {
        this.showpassword = !this.showpassword;
    }
}
