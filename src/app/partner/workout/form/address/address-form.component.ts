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

  public formErrors = {
    name: '',
    firstline: '',
    secondline: '',
    city: '',
    postalCode: ''
  };

  public validationMessages = {
    name: {
      required: 'Donnez un nom à votre addresse.',
    },
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
        this.address = result[1]; // FIXME i'm bad, i'm very very bad
        this.onSuccess.emit(this.address);
      })
      .catch(this.handleError);
    //   this.showFormResult('error', 'Echec de la sauvegarde');
  }

  protected buildForm(): void {
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

  protected createNestedEntities(address: Address): Promise<Address> {
    return Promise.resolve(address);
  }

  protected createObjectFromModel(): Address {
    const form = this.addressForm;
    const formModel = this.addressForm.value;

    const address: Address = new Address();

    if (this.address.id) {
      address.id = this.address.id;
    }
    address.name = formModel.name;
    address.firstline = formModel.firstline;
    address.secondline = formModel.secondline;
    address.city = formModel.city;
    address.postalCode = formModel.postalCode;
    address.isWorkoutLocation = true; // to do move in prepare

    return address;
  }
}
