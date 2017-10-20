import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Address } from '../../../../models/index';

import { AddressService } from '../../../../_services/index';

@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html'
})

export class AddressFormComponent implements OnInit {
    public formResult: any;
    public formReady: boolean = false;
    public loading: boolean = false;

    public addressForm: FormGroup;

    public address: Address = new Address();
    public limitedAddress: Address;

    public formErrors = {
        name: '',
        firstline: '',
        secondline: '',
        city: '',
        postalCode: ''
    };

    public validationMessages = {
      name: {
        required: 'startdate is required.',
      },
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
      }
    };


    @Output()
    public onSuccess = new EventEmitter<Address>();

    constructor(
        private fb: FormBuilder,
        private addressService: AddressService) {}

    public ngOnInit() {
        this.buildForm();
        this.formReady = true;
    }

    public onSubmit(): void {
      this.limitedAddress = this.prepareLimitedAddress();
      this.limitedAddress.isWorkoutLocation = true; // to do move in prepare
      this.hideFormResult();
        this.loading = true;
        this.addressService.create(this.limitedAddress).then(
            
            (address) => {
                this.address = address;
                this.loading = false;
                this.onSuccess.emit(this.address);
                },
                (error) => {
                   this.showFormResult('error', 'Echec de l\'ajout');
                   this.loading = false;
                });
    }

    private prepareLimitedAddress(): Address {
      const form = this.addressForm;
      const formModel = this.addressForm.value;

      const limitedAddress: Address = new Address();
      if (this.address.id) {
        limitedAddress.id = this.address.id;
      }
        limitedAddress.name = formModel.name;
        limitedAddress.firstline = formModel.firstline;
        limitedAddress.secondline = formModel.secondline;
        limitedAddress.city = formModel.city;
        limitedAddress.postalCode = formModel.postalCode;

      return limitedAddress;
    }

    private buildForm(): void {
      this.addressForm = this.fb.group({
          name: [this.address.name, [
            Validators.required,
          ]
          ],
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
