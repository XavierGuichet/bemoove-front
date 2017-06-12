import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdButton } from '@angular/material';

import { User } from '../../../models/user';
import { SocietyType } from '../../../models/society-type';
import { RegexpValidator } from '../../../_directives/regexp.directive';

import { AlertService, UserService } from '../../../_services/index';

@Component({
    selector: 'register-form-reactive',
    templateUrl: 'register-form-reactive.component.html',
    styleUrls: ['../../form.component.scss']
})
export class RegisterFormReactiveComponent implements OnInit {
    public user: User = new User();
    public showpassword: boolean = false;

    // Reset the form with a new user AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    public active = true;

    public RegisterForm: FormGroup;
    public submitted = false;
    public loading = false;

    public formErrors = {
        email: '',
        password: '',
    };

    public validationMessages = {
        email: {
            required: 'Une adresse mail est requise.',
            regexpvalidatorphrase: 'Une adresse mail valide est nécessaire.'
        },
        password: {
            required: 'Un mot de passe est requis.',
            minlength: 'Votre mot de passe doit faire au moins  8 caracteres.',
            maxlength: 'Votre mot de passe doit faire moins de 36 caracteres.'
        },
    };

    constructor(private fb: FormBuilder,
        public snackBar: MdSnackBar,
        private userService: UserService,
        private alertService: AlertService) { }

    public ngOnInit(): void {
        this.buildForm();
    }

    public onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.user = this.RegisterForm.value;
        this.userService.create(this.user)
            .subscribe(
                (data) => {
                    this.alertService.success('Registration successful', true);
                    this.snackBar.open('Inscription réussie', '', {
                      duration: 10000,
                    });
                },
                (error) => {
                    this.alertService.error(error);
                });
    }

    public onValueChanged(data?: any) {
        if (!this.RegisterForm) { return; }
        const form = this.RegisterForm;

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

    public passwordToggle() {
        this.showpassword = !this.showpassword;
    }

    private buildForm(): void {
        this.RegisterForm = this.fb.group({
            email: [this.user.email, [
                Validators.required,
                RegexpValidator(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)
            ]
            ],
            password: ['', [
                Validators.required, Validators.minLength(8),
                Validators.maxLength(36)
            ]
            ]
        });

        this.RegisterForm.valueChanges
            .subscribe((data) => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }
}
