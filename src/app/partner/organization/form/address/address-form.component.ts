import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Address } from '../../../../models/index';
import { AddressService } from '../../../../_services/index';

@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html'
})

export class AddressFormComponent implements OnInit {
  @Input()
  public address: Address;
  public limitedAddress: Address;

public formResult: any;
  public formReady = false;
  public loading: boolean = false;
  public addressForm: FormGroup;
  public formErrors = {
     firstline: '',
     secondline: '',
     city: '',
     postalCode: ''
  };

  public validationMessages = {
      firstline: {
        required: 'firstline is required.',
      },
      secondline: {
      },
      city: {
        required: 'city est nécessaire.',
      },
      postalCode: {
        required: 'postalCode est réquise.',
      },
  };

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService
  ) {
  }

  public ngOnInit(): void {
      this.buildForm();
  }

  public onSubmit(): void {
      this.loading = true;

      this.limitedAddress = this.prepareLimitedAddress();
      this.hideFormResult();
      this.addressService.update( this.limitedAddress )
                                 .then((address) => {
                                     this.address = address;
                                     this.loading = false;
                                     this.showFormResult('success', 'Sauvegarde réussie');
                                 },
                                    (error) => {
                                        this.showFormResult('error', 'Echec de la sauvegarde');
                                        this.loading = false;
                                    });
  }

  private prepareLimitedAddress(): Address {
      const form = this.addressForm;
      const formModel = this.addressForm.value;
      let limitedAddress = new Address();

      if (this.address.id) {
        limitedAddress.id = this.address.id;
      }
      if (form.get('firstline').dirty) {
        limitedAddress.firstline = formModel.firstline;
      }
      if (form.get('secondline').dirty) {
        limitedAddress.secondline = formModel.secondline;
      }
      if (form.get('postalCode').dirty) {
        limitedAddress.postalCode = formModel.postalCode;
      }
      if (form.get('city').dirty) {
        limitedAddress.city = formModel.city;
      }

      return limitedAddress;
  }

  private buildForm(): void {
      this.addressForm = this.fb.group({
        firstline: [this.address.firstline, [
          Validators.required,
        ]
        ],
        secondline: [this.address.secondline, [
        ]
        ],
        city: [this.address.city, [
          Validators.required,
        ]
        ],
        postalCode: [this.address.postalCode, [
          Validators.required,
        ]
        ]
      });
      this.addressForm.valueChanges
        .subscribe((data) => this.onValueChanged(this.addressForm, data));

      // (re)set validation messages.
      this.onValueChanged(this.addressForm);

      this.formReady = true;
  }

  private hideFormResult() {
      this.formResult = false;
  }

  private showFormResult(type: string, title: string, content: string = '') {
      this.formResult = { type, title, content};
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
