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

  public formErrors = {
    firstline: '',
    secondline: '',
    city: '',
    postalCode: ''
  };

  public validationMessages = {
    firstline: {
      required: 'Une adresse est requise.',
    },
    secondline: {
    },
    city: {
      required: 'La ville est nécessaire.',
    },
    postalCode: {
      required: 'Le code postal est réquis.',
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
    this.hideFormResult();

    let address = this.createObjectFromModel();

    this.createNestedEntities(address).then(
      (addressWithCreatedNestedEntities) => {
        return Promise.all([
          addressWithCreatedNestedEntities,
          this.createOrUpdate(this.addressService, addressWithCreatedNestedEntities)
        ]);
      })
      .then((result) => {
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
      })
      .catch(this.handleError);
    //   this.showFormResult('error', 'Echec de la sauvegarde');
  }

  protected createNestedEntities(address: Address): Promise<Address> {
    return Promise.resolve(address);
  }

  protected buildForm(): void {
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

  protected createObjectFromModel(): Address {
    const form = this.addressForm;
    const formModel = this.addressForm.value;

    const address = new Address();
    if (this.address.id) {
      address.id = this.address.id;
    }

    if (form.get('firstline').dirty) {
      address.firstline = formModel.firstline;
    }
    if (form.get('secondline').dirty) {
      address.secondline = formModel.secondline;
    }
    if (form.get('postalCode').dirty) {
      address.postalCode = formModel.postalCode;
    }
    if (form.get('city').dirty) {
      address.city = formModel.city;
    }

    return address;
  }
}
