import { Component, OnInit, Input } from '@angular/core';
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
  @Input()
  public address: Address;
  public limitedAddress: Address;

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
    super();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    this.loading = true;

    this.limitedAddress = this.prepareLimitedAddress();
    this.hideFormResult();
    this.addressService.update(this.limitedAddress)
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
}
