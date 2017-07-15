import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';

import { RegexpValidator } from '../../../_directives/regexp.directive';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Address, Profile } from '../../../models/index';
import { AddressService, ProfileService } from '../../../_services/index';

@Component({
  selector: 'address-form-reactive',
  templateUrl: 'address-form-reactive.component.html'
})

export class AddressFormReactiveComponent implements OnInit {
  @Input()
  public profile: Profile;
  public loading: boolean = false;
  public submitted: boolean = false;

  public addressForm: FormGroup;

  public formErrors = {
    name: '',
    firstline: '',
    secondline: '',
    city: '',
    postalCode: ''
  };

  public validationMessages = {
    name: {

    },
    firstline: {
      required: 'Veuillez entrez votre adresse.'
    },
    secondline: {

    },
    city: {
      required: 'Veuillez entrez votre ville.'
    },
    postalCode: {
      required: 'Veuillez entrez votre code postal.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private addressService: AddressService) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    let limitedAddress = this.prepareLimitedAddress();
    let limitedProfile = this.profile;
    limitedProfile.address = limitedAddress;
    let request;
    // this.submitted = true;
    // this.loading = true;
    alert('on Submit');
    console.log(limitedProfile);
    if (limitedProfile.id) {
      request = this.profileService.update(limitedProfile);
    } else {
      request = this.profileService.create(limitedProfile);
    }
    request.subscribe((profile) => {
        this.profile = profile;
        this.loading = false;
    });
  }

  private prepareLimitedAddress() {
    const formModel = this.addressForm.value;

    const address: Address = new Address();

    address.name = formModel.name;
    if (this.profile.address.id) {
      address.id = this.profile.address.id;
    }
    address.firstline = formModel.firstline;
    address.secondline = formModel.secondline;
    address.city = formModel.city;
    address.postalCode = formModel.postalCode;

    return address;
  }

  private onValueChanged(data?: any): void {
    if (!this.addressForm) { return; }
    const form = this.addressForm;
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
    this.addressForm = this.fb.group({
      name: [this.profile.address.name],
      firstline: [this.profile.address.firstline,
        Validators.required
      ],
      secondline: [this.profile.address.secondline],
      city: [this.profile.address.city,
        Validators.required],
      postalCode: [this.profile.address.postalCode,
        Validators.required]
    });

    this.addressForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    // (re)set validation messages.
    this.onValueChanged();
  }
}
