import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogRef, ModalComponent, CloseGuard, overlayConfigFactory } from 'angular2-modal';
import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { LoginModalComponent  } from '../login/login-modal.component';

import { AlertService, UserService } from '../../_services/index';

@Component({
    // moduleId: module.id,
    selector: 'register-modal',
    templateUrl: 'register-modal.component.html',
    styleUrls: ['../modal.component.scss']
})
export class RegisterModalComponent implements CloseGuard, ModalComponent<BSModalContext> {
    public loading = false;
    public model: any = {};
    private context: BSModalContext;

    constructor(public dialog: DialogRef<BSModalContext>,
                private router: Router,
                public modal: Modal,
                private userService: UserService,
                private alertService: AlertService) {
                this.context = dialog.context;
    }

    public register() {
        console.log('resiter launched : #obvious');
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                (data) => {
                    this.alertService.success('Registration successful', true);
                },
                (error) => {
                    console.log('(error) on registering');
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public showLoginModal() {
        return this.modal.open(LoginModalComponent,
            overlayConfigFactory({ showClose: true, isBlocking: false}, BSModalContext));
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
