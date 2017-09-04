import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SpaceService } from '../../../_services/space.service';
import { AddressService } from '../../../_services/address.service';
import { PersonService } from '../_services/person.service';
import { InvoiceSettingsService } from '../_services/invoice-settings.service';

import { Organization } from '../models/organization';
import { Address } from '../../../models/address';
import { Person } from '../models/person';

@Component({
  selector: 'organization-informations',
  templateUrl: 'informations.component.html'
})

export class OrganizationInformationsComponent implements OnInit {
  public loading = false;
  public organization: Organization;
  public limitedOrganization: Organization;
  public contactDetailForm: FormGroup;
  public legalRepresentativeForm: FormGroup;
  public addressForm: FormGroup;

  public formErrors = {
    legalName: '',
    siret: '',
    vatNumber: '',
    legalRepresentativefirstname: '',
    legalRepresentativelastname: '',
    legalRepresentativeemail: '',
    legalRepresentativebirthdate: '',
      addressfirstline: '',
      addresssecondline: '',
      addresscity: '',
      addresspostalCode: ''
  };

  public validationMessages = {
    legalName: {
      required: 'Veuillez indiquer le nom de votre société',
    },
    siret: {

    },
    vatNumber: {

    },
    legalRepresentativefirstname: {
      required: 'Veuillez indiquer le prénom du représantant de la société.',
    },
    legalRepresentativelastname: {
      required: 'Veuillez indiquer le nom du représantant de la société.',
    },
    legalRepresentativeemail: {
      required: 'Veuillez indiquer l\'email.',
    },
    legalRepresentativebirthdate: {
      required: 'Veuillez indiquer la date de naissance.',
    },

    addressfirstline: {
      required: 'firstline is required.',
    },
    addresssecondline: {
    },
    addresscity: {
      required: 'city est nécessaire.',
    },
    addresspostalCode: {
      required: 'postalCode est réquise.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private invoiceSettingsService: InvoiceSettingsService,
    private addressService: AddressService,
    private personService: PersonService,
    private spaceService: SpaceService) { }

  public ngOnInit(): void {
    this.invoiceSettingsService.getByOwnerId(this.spaceService.getUserId()).then((Business) => {
      // TODO : This is ugly, service should return one result in this case
      if (Business[0].hasOwnProperty('id')) {
        this.organization = Business[0];
      } else {
        this.organization = new Organization();
      }

      this.buildForms();
    });
  }

  public onSubmitContactDetail(): void {
      this.loading = true;

      const form = this.contactDetailForm;
      const formModel = this.contactDetailForm.value;
      let limitedOrganization = new Organization();

      if (this.organization.id) {
        limitedOrganization.id = this.organization.id;
      }
      if (form.get('legalName').dirty) {
        limitedOrganization.legalName = formModel.legalName;
      }
      if (form.get('siret').dirty) {
        limitedOrganization.siret = formModel.siret;
      }
      if (form.get('vatNumber').dirty) {
        limitedOrganization.vatNumber = formModel.vatNumber;
      }

      this.invoiceSettingsService.update( limitedOrganization )
                                 .subscribe((organization) => {
                                     this.organization = organization;
                                     this.loading = false;
                                 });
  }
  public onSubmitLegalRepresentative(): void {
      this.loading = true;

      const form = this.legalRepresentativeForm;
      const formModel = this.legalRepresentativeForm.value;
      let limitedLegalRepresentative = new Person();

      if (this.organization.legalRepresentative.id) {
        limitedLegalRepresentative.id = this.organization.legalRepresentative.id;
      }
      if (form.get('firstname').dirty) {
        limitedLegalRepresentative.firstname = formModel.firstname;
      }
      if (form.get('lastname').dirty) {
        limitedLegalRepresentative.lastname = formModel.lastname;
      }
      if (form.get('email').dirty) {
        limitedLegalRepresentative.email = formModel.email;
      }
      if (form.get('birthdate').dirty) {
          let  birthdate = new Date(formModel.birthdate.year,
            formModel.birthdate.month - 1,
            formModel.birthdate.day,
            1,
            0,
            0);

        limitedLegalRepresentative.birthdate = birthdate;
      }

      this.personService.update( limitedLegalRepresentative )
                                 .subscribe((person) => {
                                     this.organization.legalRepresentative = person;
                                     this.loading = false;
                                 });
  }
  public onSubmitAddress(): void {
      this.loading = true;

      const form = this.addressForm;
      const formModel = this.addressForm.value;
      let limitedAddress = new Address();

      if (this.organization.address.id) {
        limitedAddress.id = this.organization.address.id;
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

      this.addressService.update( limitedAddress )
                                 .subscribe((address) => {
                                     this.organization.address = address;
                                     this.loading = false;
                                 });
  }

  private buildForms(): void {
    this.buildContactDetailForm();
    this.buildLegalRepresentativeForm();
    this.buildAddressForm();
  }

  private buildContactDetailForm(): void {
    this.contactDetailForm = this.fb.group({
      legalName: [this.organization.legalName, [
        Validators.required
      ]
      ],
      siret: [this.organization.siret, [
        Validators.required
      ]
      ],
      vatNumber: [this.organization.vatNumber, [
        Validators.required
      ]
      ],
    });

    this.contactDetailForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.contactDetailForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.contactDetailForm);
  }

  private buildLegalRepresentativeForm(): void {
      let birthdate = new Date(this.organization.legalRepresentative.birthdate);
      let ngbBirthdate = {
        year: birthdate.getFullYear(),
        month: birthdate.getMonth() + 1,
        day: birthdate.getDate()
      };
    this.legalRepresentativeForm = this.fb.group({
      firstname: [this.organization.legalRepresentative.firstname, [
        Validators.required
      ]
      ],
      lastname: [this.organization.legalRepresentative.lastname, [
        Validators.required
      ]
      ],
      email: [this.organization.legalRepresentative.email, [
        Validators.required
      ]
      ],
      birthdate: [ngbBirthdate, [
        Validators.required
      ]
      ],
    });

    this.legalRepresentativeForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.legalRepresentativeForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.legalRepresentativeForm);
  }

  private buildAddressForm(): void {
    this.addressForm = this.fb.group({
      firstline: [this.organization.address.firstline, [
        Validators.required,
      ]
      ],
      secondline: [this.organization.address.secondline, [
      ]
      ],
      city: [this.organization.address.city, [
        Validators.required,
      ]
      ],
      postalCode: [this.organization.address.postalCode, [
        Validators.required,
      ]
      ]
    });
    this.addressForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.addressForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.addressForm);
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
