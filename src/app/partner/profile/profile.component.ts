import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SpaceService } from '../../_services/space.service';
import { ProfileService } from '../../_services/profile.service';

import { Profile } from '../../models/profile';

@Component({
  selector: 'organization-informations',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
  public loading = false;
  public profile: Profile;
  public profileForm: FormGroup;

  public formErrors = {
    legalName: '',
    siret: '',
    vatNumber: '',
  };

  public validationMessages = {
    legalName: {
      required: 'Veuillez indiquer le nom de votre société',
    },
    siret: {

    },
    vatNumber: {

    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private spaceService: SpaceService) { }

  public ngOnInit(): void {
    this.profileService.getByOwnerId(this.spaceService.getUserId()).then((Profile) => {
        this.profile = Profile[0];
        this.buildForm();
    });
  }

  public onSubmit(): void {
      this.loading = true;
      //
      const form = this.profileForm;
      const formModel = this.profileForm.value;
      let limitedProfile = new Profile();
      //
      if (this.profile.id) {
        limitedProfile.id = this.profile.id;
      }
      if (form.get('firstname').dirty) {
        limitedProfile.firstname = formModel.firstname;
      }
      if (form.get('lastname').dirty) {
        limitedProfile.lastname = formModel.lastname;
      }
      if (form.get('presentation').dirty) {
        limitedProfile.presentation = formModel.presentation;
      }

      this.profileService.update( limitedProfile )
                                 .subscribe((profile) => {
                                     this.profile = profile;
                                     this.loading = false;
                                 });
  }

  private buildForm(): void {
      this.profileForm = this.fb.group({
        firstname: [this.profile.firstname, [
          Validators.required
        ]
        ],
        lastname: [this.profile.lastname, [
          Validators.required
        ]
        ],
        presentation: [this.profile.presentation, [
          Validators.required
        ]
        ],
      });
      //
    //   this.contactDetailForm.valueChanges
    //     .subscribe((data) => this.onValueChanged(this.contactDetailForm, data));
      //
    //   // (re)set validation messages.
    //   this.onValueChanged(this.contactDetailForm);
  }

  private onValueChanged(form, data?: any): void {
    const formErrors = this.formErrors;
    this.formErrors = this.recursiveCheck(form, formErrors);
  }

  private recursiveCheck(form, formErrors, validationprefix = '') {
    if (validationprefix !== '') {
      validationprefix += '.';
    }
    for (const field in formErrors) {
      if (typeof formErrors[field] === 'string') {
        const control = form.get(validationprefix + field);
        formErrors[field] = this.checkControlError(control, validationprefix + field);
      } else if (typeof this.formErrors[field] === 'object') {
        let prefix = validationprefix + field;
        formErrors[field] = this.recursiveCheck(this.formErrors[field], prefix);
      }
    }
    return formErrors;
  }

  private checkControlError(control, field) {
    let errorMessages = '';
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorMessages += messages[key] + ' ';
        }
      }
    }
    return errorMessages;
  }
}
