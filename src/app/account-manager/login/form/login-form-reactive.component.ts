import { Component, OnInit } from '@angular/core';
import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatButtonModule, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from '../../../models/index';
import { LoginModalComponent } from '../modal/login-modal.component';

import { AlertService,
  AuthenticationService,
  SpaceService } from '../../../_services/index';

@Component({
  selector: 'login-form-reactive',
  templateUrl: 'login-form-reactive.component.html',
  styleUrls: ['../../form.component.scss']
})
export class LoginFormReactiveComponent extends BMReactFormComponent implements OnInit {
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
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private authenticationService: AuthenticationService) {
        super();
     }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit() {
    this.loading = true;
    let account = this.createObjectFromModel();
    this.authenticationService.login(account.username, account.password, true)
      .then(
      (data) => {
        this.dialogRef.close();
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
