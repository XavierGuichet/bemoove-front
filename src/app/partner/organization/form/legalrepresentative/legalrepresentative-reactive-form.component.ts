import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RegexpValidator } from '../../../../_directives/regexp.directive';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LegalRepresentative, Person } from '../../../../models/index';
import { LegalRepresentativeService, PersonService } from '../../../../_services/index';

@Component({
  selector: 'legalrepresentative-reactive-form',
  templateUrl: './legalrepresentative-reactive-form.component.html'
})

export class LegalRepresentativeFormReactiveComponent implements OnInit {
  public loading: boolean = false;
  public submitted: boolean = false;

  public legalRepresentativeForm: FormGroup;

  @Input()
  public person: Person;
  public legalRepresentative: LegalRepresentative;
  public limitedLegalRepresentative: LegalRepresentative;

  public formErrors = {
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
  };

  public validationMessages = {
    firstname: {
      required: 'startdate is required.',
    },
    lastname: {
      required: 'Veuillez choisir une adresse.',
    },
    email: {
      required: 'Une adresse mail est requise.',
      regexpvalidatorphrase: 'Une adresse mail valide est nécessaire.'
    },
    birthdate: {
      required: 'Veuillez choisir une adresse.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private legalRepresentativeService: LegalRepresentativeService
  ) {

  }

  public ngOnInit(): void {
      this.legalRepresentative = new LegalRepresentative();
    this.buildForm();
  }

  public onSubmit(): void {
    let limitedLegalRepresentative = this.prepareLimitedLegalRepresentative();
    let request;
    this.submitted = true;
    this.loading = true;
    if (limitedLegalRepresentative.id) {
      request = this.legalRepresentativeService.update(limitedLegalRepresentative);
    } else {
      request = this.legalRepresentativeService.create(limitedLegalRepresentative);
    }
    request.subscribe((legalRepresentative) => { this.legalRepresentative = legalRepresentative; this.loading = false; });
  }

  private prepareLimitedLegalRepresentative() {
    const formModel = this.legalRepresentativeForm.value;

    const limitedLegalRepresentative: LegalRepresentative = new LegalRepresentative();
    // if (this.legalRepresentative.id) {
    //   limitedLegalRepresentative.id = this.legalRepresentative.id;
    // }
    // limitedLegalRepresentative.telHome = formModel.telHome;
    // limitedLegalRepresentative.telMobile = formModel.telMobile;

    return limitedLegalRepresentative;
  }

  private onValueChanged(data?: any): void {
    if (!this.legalRepresentativeForm) { return; }
    const form = this.legalRepresentativeForm;
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
    this.legalRepresentativeForm = this.fb.group({
      firstname: [this.legalRepresentative.firstName, [
        Validators.required
      ]
      ],
      lastname: [this.legalRepresentative.lastName, [
        Validators.required
      ]
      ],
      email: [this.legalRepresentative.email, [
        Validators.required,
        RegexpValidator(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)
      ]
      ],
      birthdate: [this.legalRepresentative.birthdate,
      ],
    });

    this.legalRepresentativeForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    // (re)set validation messages.
    this.onValueChanged();
  }
}
