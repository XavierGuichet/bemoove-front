import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatButton, MatInput } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from '../../../models/account';
import { SocietyType } from '../../../models/society-type';
import { RegexpValidator } from '../../../_directives/regexp.directive';

import { AlertService, AuthenticationService, SpaceService } from '../../../_services/index';

@Component({
  selector: 'register-form-reactive',
  templateUrl: 'register-form-reactive.component.html',
  styleUrls: ['../../form.component.scss', './register-form-reactive.component.scss']
})
export class RegisterFormReactiveComponent implements OnInit {
  @Input()
  public theme: string = 'default';
  @Input()
  public registerAccountType: string = 'User';
  public account: Account = new Account();
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
      regexpvalidatorphrase: 'Une adresse mail valide est nécessaire.'
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
    public snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private spaceService: SpaceService
    ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.account = this.RegisterForm.value;
    this.authenticationService.register(this.account)
    .then(
      (data) => {
          this.alertService.success('Registration successful', true);
          this.snackBar.open('Inscription réussie', '', {
            duration: 10000,
          });
          this.authenticate();
      });
    //   .catch(this.handleError);
    //   (error) => {
        // this.alertService.error(error);
    //   });
  }

  public authenticate() {
      this.authenticationService.login(this.account.email, this.account.password)
          .subscribe(
              (data) => {
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
              },
              (error) => {
                  this.alertService.error(error);
                  this.loading = false;
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

  public partnerHelpToggle() {
      this.showpartnerhelp = !this.showpartnerhelp;
  }

  private buildForm(): void {
    // Todo: This shoulb be DRY
    if (this.registerAccountType === 'Partner') {
      this.RegisterForm = this.fb.group({
        email: [this.account.email, [
          Validators.required,
          RegexpValidator(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)
        ]
        ],
        password: ['', [
          Validators.required, Validators.minLength(8),
          Validators.maxLength(36)
        ]
        ],
        creationToken: ['', [
          Validators.required
        ]
        ],
      });
    } else if (this.registerAccountType === 'User') {
      this.RegisterForm = this.fb.group({
        email: [this.account.email, [
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
    }

    this.RegisterForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
}
