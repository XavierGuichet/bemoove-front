import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { Address } from '../../../../models/index';

import { AddressService } from '../../../../_services/index';

@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html'
})

export class AddressFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

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
    private addressService: AddressService) {
    super();
  }

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
}
