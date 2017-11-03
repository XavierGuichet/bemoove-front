import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Profile } from '../../../models/index';
import { ProfileService } from '../../../_services/index';

@Component({
  selector: 'personnal-informations-form-reactive',
  templateUrl: './personnal-informations-form-reactive.component.html'
})

export class PersonnalInformationsFormReactiveComponent implements OnInit {
  @Input()
  public profile: Profile;

  public personnalInformationsForm: FormGroup;
  public loading = false;
  public submitted = false;

  public minBirthDate: { year: number, month: number, day: number } = {
    year: 1900,
    month: 1,
    day: 1
  };
  public maxBirthDate: { year: number, month: number, day: number };
  public nbgBirthdate: { year: number, month: number, day: number };

  public formErrors = {
    gender: '',
    firstname: '',
    lastname: '',
    nbgBirthdate: '',
  };

  public validationMessages = {
    gender: {
      required: ''
    },
    firstname: {
      required: 'Vous n\'avez pas de prénom ?'
    },
    lastname: {
      required: 'Vous n\'avez pas de de nom ?'
    },
    nbgBirthdate: {
    },
  };

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder) {

  }

  public ngOnInit(): void {
    let now = new Date();
    let maxbirthDate = new Date(now.getTime() - 18 * 365 * 24 * 60 * 60 * 1000);
    this.maxBirthDate = {
      year: maxbirthDate.getFullYear(),
      month: maxbirthDate.getMonth() + 1,
      day: maxbirthDate.getDate()
    };
    this.buildForm();
  }

  public onSubmit(): void {
    let limitedProfile = this.prepareLimitedProfile();
    let request;
    this.submitted = true;
    this.loading = true;

    if (limitedProfile.id) {
      request = this.profileService.update(limitedProfile);
    } else {
      request = this.profileService.create(limitedProfile);
    }
    request.subscribe((profile) => { this.profile = profile; this.loading = false; });
  }

  private prepareLimitedProfile() {
    const formModel = this.personnalInformationsForm.value;

    const limitedProfile: Profile = new Profile();
    if (this.profile.id) {
      limitedProfile.id = this.profile.id;
    }
    limitedProfile.ismale = (formModel.gender === 'men' ? true : false);
    limitedProfile.firstname = formModel.firstname;
    limitedProfile.lastname = formModel.lastname;
    if (typeof formModel.birthdate !== 'undefined') {
      let birthdate = new Date(formModel.birthdate.year,
        formModel.birthdate.month - 1,
        formModel.birthdate.day,
        6,
        0,
        1);
      limitedProfile.birthdate = birthdate;
    }

    return limitedProfile;
  }

  private onValueChanged(data?: any): void {
    if (!this.personnalInformationsForm) { return; }
    const form = this.personnalInformationsForm;
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
    let birthDate = new Date(this.profile.birthdate);
    this.nbgBirthdate = {
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate()
    };
    this.personnalInformationsForm = this.fb.group({
      gender: [(this.profile.ismale ? 'men' : 'women'),
        Validators.required,
      ],
      firstname: [this.profile.firstname,
        Validators.required,
      ],
      lastname: [this.profile.lastname,
        Validators.required
      ],
      nbgBirthdate: [this.nbgBirthdate,
      ],
    });

    this.personnalInformationsForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    // (re)set validation messages.
    this.onValueChanged();
  }

  get diagnostic() { return JSON.stringify(this.personnalInformationsForm.value); }
}
