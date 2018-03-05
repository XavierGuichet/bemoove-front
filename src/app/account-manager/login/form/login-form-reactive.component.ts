import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../_services/index';

@Component({
  selector: 'login-form-reactive',
  templateUrl: 'login-form-reactive.component.html',
  styleUrls: ['../../form.component.scss']
})
export class LoginFormReactiveComponent extends BMReactFormComponent implements OnInit {
  @Output()
  public onSuccess = new EventEmitter<boolean>();

  public LoginForm: FormGroup;

  public formErrors = {
    username: '',
    password: '',
  };

  public validationMessages = {
    username: {
      required: 'Name is required.',
      email: 'Une adresse mail valide est nécessaire.'
    },
    password: {
      required: 'Password is required.',
    },
  };

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService) {
        super();
     }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit() {
    this.loading = true;
    let account = this.createObjectFromModel();
    this.authenticationService.login(account.username, account.password)
      .then(
      (data) => {
          this.onSuccess.emit(true);
      }
      );
  }

  protected buildForm(): void {
    this.LoginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['', [
        Validators.required,
      ]
      ]
    });

    this.LoginForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.LoginForm, data));

    this.onValueChanged(this.LoginForm); // (re)set validation messages now
  }

  protected createNestedEntities(model: any): Promise<void> {
    return Promise.resolve(null);
  }

  protected createObjectFromModel() {
    return this.LoginForm.value;
  }

}
