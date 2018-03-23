import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { Headers } from '@angular/http';

import { RegexpValidator } from '../../../../_directives/regexp.directive';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Address, Person } from '../../../../models/index';
import { AddressService, PersonService } from '../../../../_services/index';

@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html'
})

export class AddressFormComponent extends BMReactFormComponent implements OnInit {
  @Input()
  public address: Address;
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
    private personService: PersonService,
    private addressService: AddressService) {
    super();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.addressForm = this.fb.group({
      name: [this.address.name],
      firstline: [this.address.firstline,
      Validators.required
      ],
      secondline: [this.address.secondline],
      city: [this.address.city,
      Validators.required],
      postalCode: [this.address.postalCode,
      Validators.required]
    });

    this.addressForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.addressForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.addressForm);
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

  protected createObjectFromModel(): Address {
    const form = this.addressForm;
    const formModel = this.addressForm.value;

    const address: Address = new Address();

    if (this.address.id) {
      address.id = this.address.id;
    }
    if (form.get('name').dirty) {
      address.name = formModel.name;
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
