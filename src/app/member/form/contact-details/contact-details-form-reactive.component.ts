import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RegexpValidator } from '../../../_directives/regexp.directive';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Profile } from '../../../models/index';
import { ProfileService } from '../../../_services/index';

@Component({
  selector: 'contact-details-form-reactive',
  templateUrl: './contact-details-form-reactive.component.html',
  styleUrls: ['./contact-details-form-reactive.component.scss']
})

export class ContactDetailsFormReactiveComponent implements OnInit {
  @Input()
  public profile: Profile;
  public loading: boolean = false;
  public submitted: boolean = false;

  public contactDetailsForm: FormGroup;

  public formErrors = {
    telMobile: '',
    telHome: ''
  };

  public validationMessages = {
    telMobile: {
      required: 'Un numéro de téléphone portable est requis.',
      regexpvalidatorphrase: 'Ce numero n\'est pas valide',
    },
    telHome: {
      regexpvalidatorphrase: 'Ce numero n\'est pas valide',
    }
  };

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService) {

  }

  public ngOnInit(): void {
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
    const formModel = this.contactDetailsForm.value;

    const limitedProfile: Profile = new Profile();
    if (this.profile.id) {
      limitedProfile.id = this.profile.id;
    }
    limitedProfile.telHome = formModel.telHome;
    limitedProfile.telMobile = formModel.telMobile;

    return limitedProfile;
  }

  private onValueChanged(data?: any): void {
    if (!this.contactDetailsForm) { return; }
    const form = this.contactDetailsForm;
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
    this.contactDetailsForm = this.fb.group({
      telMobile: [this.profile.telMobile, [
        Validators.required,
        RegexpValidator(/^(0|\\+33|0033)[1-9][0-9]{8}?$/i)
        ]
      ],
      telHome: [this.profile.telHome,
        //   RegexpValidator(/^(0|\\+33|0033)[1-9][0-9]{8}?$/i)
      ],
    });

    this.contactDetailsForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    // (re)set validation messages.
    this.onValueChanged();
  }
}
