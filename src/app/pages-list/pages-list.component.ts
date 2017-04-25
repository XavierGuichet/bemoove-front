import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router }   from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { RegisterModalComponent  } from '../modal/register/register-modal.component';

import { User } from '../models/user';
import { UserService } from '../_services/index';

import { Workout }          from '../models/workout';
import { Day }          from '../models/day';

@Component({
    // moduleId: module.id,
    selector: 'pages-list',
    providers: [],
    templateUrl: 'pages-list.component.html',
    styleUrls: ['pages-list.component.css']
})

export class PagesListComponent implements OnInit {
    public users: User[] = [];

    constructor(
        overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
        private router: Router,
        private userService: UserService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    public ngOnInit(): void {
        this.loadAllUsers();
    }

    public showJoinUs() {
        return this.modal.open(RegisterModalComponent,
                                overlayConfigFactory({
                                    showClose: false,
                                    isBlocking: false},
                                BSModalContext));
    }

    private loadAllUsers(): void {
        this.userService.getAll().then((users) => this.users = users);
    }
}
