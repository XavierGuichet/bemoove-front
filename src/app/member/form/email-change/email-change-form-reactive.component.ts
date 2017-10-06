import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RegexpValidator } from '../../../_directives/regexp.directive';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'email-change-form-reactive',
  templateUrl: './email-change-form-reactive.component.html'
})

export class EmailChangeFormReactiveComponent implements OnInit {
    public loading: boolean = false;
    public valid: boolean = false;
    public submitted: boolean = false;

    public emailChangeForm: FormGroup;

    public formErrors = {
        email: '',
        emailRepeat: ''
    };

    public validationMessages = {
        email: {
            required: 'Veuillez entrer votre nouvelle adresse email.',
            regexpvalidatorPhrase: 'Une adresse mail valide est nécessaire.'
        },
        emailRepeat: {
            required: 'Veuillez confirmer votre nouvelle adresse email.',
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
      if (!this.emailChangeForm) { return; }
      const form = this.emailChangeForm;
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
      this.emailChangeForm = this.fb.group({
        email: ['',
          Validators.required,
          RegexpValidator(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)
        ],
        emailRepeat: ['',
            Validators.required,
        ],
    });

      this.emailChangeForm.valueChanges
        .subscribe((data) => this.onValueChanged(data));

      // (re)set validation messages.
      this.onValueChanged();
    }
}
