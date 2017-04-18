import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';


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
    users: User[] = [];

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.loadAllUsers();
    }

    private loadAllUsers(): void {
        this.userService.getAll().then(users => this.users = users);
    }
}
