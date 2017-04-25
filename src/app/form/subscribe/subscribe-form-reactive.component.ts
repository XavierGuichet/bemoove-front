import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User }                   from '../../models/user';
import { RegexpValidator } from '../../shared/regexp.directive';

@Component({
    // moduleId: module.id,
    selector: 'subscribe-form-reactive',
    templateUrl: 'subscribe-form-reactive.component.html',
    styleUrls: ['subscribe-form-reactive.component.css']
})
export class SubscribeFormReactiveComponent implements OnInit {
    public user = new User();
    public sports = ['Art Martiaux', 'Détente / Bien être', 'Danse', 'Musculation',
                     'Remise en forme', 'Sports aquatique', 'Sports collectif',
                     'Sports de combat', 'Sport d\'opposition', 'Sports nautique',
                     'Sport de raquette'];

    // Reset the form with a new user AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    public active = true;

    public subscribeForm: FormGroup;
    public submitted = false;

    public formErrors = {
        email: '',
        passwords: '',
        password: '',
        repeat: '',
        cartepronum: ''
    };

    public validationMessages = {
        email: {
            required: 'Name is required.',
            regexpvalidatorphrase: 'This must be a valid email.'
        },
        password: {
            required: 'Password is required.',
            minlength: 'Password must be at least 8 characters long.',
            maxlength: 'Password cannot be more than 36 characters long.',
            regexpvalidatorphrase: 'Use a complex password'
        },
        repeat: {
            areEqual: 'Password repetition is required.',
        },
        passwords: {
            areEqual: 'Passwords are different.',
        },
        cartepronum: {
            isValidCartePro: 'You must enter your professionnal license ' +
                             'or indicate that your activity doesn\'t need one',
        }
    };

    constructor(private fb: FormBuilder) { }

    get diagnostic() { return JSON.stringify(this.user); }

    public ngOnInit(): void {
        this.buildForm();
    }

    public onSubmit() {
        this.submitted = true;
        this.user = this.subscribeForm.value;
    }

    public toggleCartePro(): void {
        const form = this.subscribeForm;
        let disabled = form.get('cartepronotneeded').value;
        form.get('cartepronum').reset({value: '', disabled: !disabled});
    }

    public isValidCartePro(control: FormControl) {
        let valid = false;

        if (!control.disabled) {
            valid = true;
        }
        let regexp = new RegExp(/^([0-9]{4,5})([A-Z]{1,3})([0-9]{4,5})$/i);
        let numcartepro = control.value;
        valid = regexp.test(numcartepro);

        console.log('isvalidcartePRO');
        console.log(valid);

        return valid ? null : {isValidCartePro: {numcartepro}};
    }

    public areEqual(group: FormGroup) {
        let valid = false;
        let lastSeenValue = false;
        let val;
        for (const name in group.controls) {
            if (group.controls.hasOwnProperty(name)) {
                val = group.controls[name].value;
                if (lastSeenValue === false) {
                    lastSeenValue = val;
                }
                if (lastSeenValue === val) {
                    lastSeenValue = val;
                    valid = true;
                } else {
                    valid = false;
                    break;
                }
            }
        }
        return valid ? null : {areEqual: {val}};
    }

    public onValueChanged(data?: any) {
        if (!this.subscribeForm) { return; }
        const form = this.subscribeForm;

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

                const subcontrol = form.controls['passwords'].get(field);
                if (subcontrol && subcontrol.dirty && !subcontrol.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in subcontrol.errors) {
                        if (subcontrol.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    private buildForm(): void {
        this.subscribeForm = this.fb.group({
            email: [this.user.email, [
                Validators.required,
                RegexpValidator(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)
            ]
            ],
            nom: ['', [
                Validators.required
            ]
            ],
            prenom: ['', [
                Validators.required
            ]
            ],
            passwords: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(8),
                    Validators.maxLength(36),
                    RegexpValidator(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)]],
                repeat: ['', [Validators.required]]
            }, { validator: this.areEqual }),
            sports: ['', [Validators.required]],
            cartepronum: ['', [this.isValidCartePro]],
            cartepronotneeded: ['']
        });

        this.subscribeForm.valueChanges
            .subscribe((data) => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }
}
