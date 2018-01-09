import { Component, OnInit, Input } from '@angular/core';
import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatButton, MatInput, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from '../../../models/account';
import { SocietyType } from '../../../models/society-type';
import { RegexpValidator } from '../../../_directives/regexp.directive';

import { RegisterModalComponent } from '../modal/register-modal.component';
import { AlertService, AuthenticationService, SpaceService } from '../../../_services/index';

@Component({
  selector: 'register-form-reactive',
  templateUrl: 'register-form-reactive.component.html',
  styleUrls: ['../../form.component.scss', './register-form-reactive.component.scss']
})
export class RegisterFormReactiveComponent extends BMReactFormComponent implements OnInit {
  @Input()
  public theme: string = 'default';
  @Input()
  public registerAccountType: string = 'User';
  public showpassword: boolean = false;
  public showpartnerhelp: boolean = false;

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
    creationToken: '',
  };

  public validationMessages = {
    email: {
      required: 'Une adresse mail est requise.',
      email: 'Une adresse mail valide est nécessaire.'
    },
    password: {
      required: 'Un mot de passe est requis.',
      minlength: 'Votre mot de passe doit faire au moins  8 caracteres.',
      maxlength: 'Votre mot de passe doit faire moins de 36 caracteres.'
    },
    creationToken: {
      required: 'Un code d\'inscription est requis.',
    }
  };

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    private authenticationService: AuthenticationService,
  ) {
      super();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit() {
    this.loading = true;
    let account = this.createObjectFromModel();

    this.authenticationService.register(account)
      .then(
      (data) => {
        this.dialogRef.close();
      });
  }

  public passwordToggle() {
    this.showpassword = !this.showpassword;
  }

  public partnerHelpToggle() {
    this.showpartnerhelp = !this.showpartnerhelp;
  }

  protected buildForm(): void {
    this.RegisterForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['', [
        Validators.required, Validators.minLength(8),
        Validators.maxLength(36)
      ]
      ]
    });

    if (this.registerAccountType === 'Partner') {
      this.RegisterForm.addControl('creationToken',
        new FormControl('', Validators.required));
    }

    this.RegisterForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.RegisterForm, data));

    this.onValueChanged(this.RegisterForm); // (re)set validation messages now

    this.formReady = true;
  }

  protected createNestedEntities(model: any): Promise<void> {
      return Promise.resolve(null);
  }

  protected createObjectFromModel() {
      return this.RegisterForm.value;
  }
}
