import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdButtonModule, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../models/user';
import { LoginModalComponent  } from '../modal/login-modal.component';

import { AlertService, AuthenticationService } from '../../../_services/index';
import { SpaceService } from '../../../_services/space.service';

@Component({
    selector: 'login-form-reactive',
    templateUrl: 'login-form-reactive.component.html',
    styleUrls: ['../../form.component.scss']
})
export class LoginFormReactiveComponent implements OnInit {
    public user: User = new User();
    public loading = false;
    // Reset the form with a new user AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    public active = true;

    public LoginForm: FormGroup;
    public submitted = false;

    public formErrors = {
        username: '',
        password: '',
    };

    public validationMessages = {
        username: {
            required: 'Name is required.',
        },
        password: {
            required: 'Password is required.',
        },
    };

    private returnUrl: string;

    constructor(private fb: FormBuilder,
        public snackBar: MdSnackBar,
        public dialogRef: MdDialogRef<LoginModalComponent>,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spaceService: SpaceService) { }

    public ngOnInit(): void {
        this.buildForm();
    }

    public onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.user = this.LoginForm.value;
        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(
                (data) => {
                    this.dialogRef.close();
                    let zone = this.spaceService.getZone();
                    if (zone === 'ROLE_COACH') {
                        this.router.navigate(['/coach']);
                        return;
                    }
                    if (zone === 'ROLE_USER') {
                        this.router.navigate(['/user']);
                        return;
                    }
                    this.router.navigate(['/search']);
                },
                (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public onValueChanged(data?: any) {
        if (!this.LoginForm) { return; }
        const form = this.LoginForm;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    private buildForm(): void {
        this.LoginForm = this.fb.group({
            username: [this.user.username, [
                Validators.required,
            ]
            ],
            password: ['', [
                Validators.required,
            ]
            ]
        });

        this.LoginForm.valueChanges
            .subscribe((data) => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }
}
