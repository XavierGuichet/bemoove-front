import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatButtonModule, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from '../../../models/index';
import { LoginModalComponent  } from '../modal/login-modal.component';

import { AlertService,
         AuthenticationService,
         SpaceService } from '../../../_services/index';

@Component({
    selector: 'login-form-reactive',
    templateUrl: 'login-form-reactive.component.html',
    styleUrls: ['../../form.component.scss']
})
export class LoginFormReactiveComponent implements OnInit {
    public account: Account = new Account();
    public loading = false;
    // Reset the form with a new account AND restore 'pristine' class state
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
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<LoginModalComponent>,
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
        this.account = this.LoginForm.value;
        this.authenticationService.login(this.account.username, this.account.password)
            .then(
                (data) => {
                    this.dialogRef.close();
                    let zone = this.spaceService.getZone();
                    if (zone === 'ROLE_PARTNER') {
                        this.router.navigate(['/partner']);
                        return;
                    }
                    if (zone === 'ROLE_USER') {
                        this.router.navigate(['/workouts']);
                        return;
                    }
                    this.router.navigate(['/workouts']);
                }
    //             ,
    //             (error) => {
    //                 this.alertService.error(error);
    // this.loading = false;
    //             }
            );
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
            username: [this.account.username, [
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
