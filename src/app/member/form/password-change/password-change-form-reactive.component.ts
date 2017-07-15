import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'password-change-form-reactive',
  templateUrl: './password-change-form-reactive.component.html',
  styleUrls: ['./password-change-form-reactive.component.scss']
})

export class PasswordChangeFormReactiveComponent implements OnInit {
  public loading: boolean = false;
  public valid: boolean = false;
  public submitted: boolean = false;

  public passwordChangeForm: FormGroup;

  public formErrors = {
    oldPassword: '',
    password: '',
    passwordRepeat: ''
  };

  public validationMessages = {
    oldPassword: {
      required: 'Veuillez entrer votre mot de passe actuel'
    },
    password: {
      required: 'Veuillez entrer un nouveau mot de passe',
      minlength: 'Votre mot de passe doit faire au moins  8 caracteres.',
      maxlength: 'Votre mot de passe doit faire moins de 36 caracteres.'
    },
    passwordRepeat: {
      required: 'Veuillez confirmer votre nouveau mot de passe',
    },
  };

  constructor(
    private fb: FormBuilder) {

  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    // TODO
  }

  private onValueChanged(data?: any): void {
    if (!this.passwordChangeForm) { return; }
    const form = this.passwordChangeForm;
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
    this.passwordChangeForm = this.fb.group({
      oldPassword: ['',
        Validators.required
      ],
      password: ['',
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(36)
      ],
      passwordRepeat: ['',
        Validators.required,
      ],
    });

    this.passwordChangeForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    // (re)set validation messages.
    this.onValueChanged();
  }
}
