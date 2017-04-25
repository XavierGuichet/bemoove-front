import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    // moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    public model: any = {};
    public loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    public register() {
        console.log('register launched : #obvious');
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                (data) => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log('error on registering');
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
