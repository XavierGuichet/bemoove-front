import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SpaceService } from '../../../_services/space.service';
import { InvoiceSettingsService } from '../_services/invoice-settings.service';

import { Organization } from '../models/organization';

function validateLuhn(c: FormControl) {
  const value = c.value;
  if (value === null || (value.length !== 14) || (isNaN(value))) {
    return false;
  }

  let sum = 0;
  let tmp;
  for (let pos = (value.length - 1); pos >= 0; pos--) {
    tmp = parseInt(value.charAt(pos), 10);
    if ((pos % 2) === 0) { // Les positions impaires : 1er, 3è, 5è, etc...
      tmp = tmp * 2; // On le multiplie par 2
      if (tmp > 9) {
        tmp -= 9; // Si le résultat est supérieur à 9, on lui soustrait 9
      }
    }
    sum += tmp;
  }
  if ( (sum % 10) === 0 ) {
      return null;
  }
  return {validateLuhn : {value}};
}

@Component({
  selector: 'invoice-settings',
  templateUrl: 'invoice-settings.component.html'
})

export class InvoiceSettingsComponent implements OnInit {
  public loading = false;
  public tvaRateForm: FormGroup;
  public invoiceNoticeForm: FormGroup;
  public organization: Organization;
  public limitedOrganization: Organization;
  public organizationLegalStatus: string;

  public formErrors = {
    organizationLegalStatus: '',
    organizationSiret: '',
    organizationShareCapital: '',
    organizationRCSNumber: '',
    organizationAPENumber: '',
    organizationVATNumber: '',
    organizationVatRate: '',
  };

  public validationMessages = {
    organizationLegalStatus: {
      required: 'Vous devez choisir le status legal de votre activité.'
    },
    organizationSiret: {
      minlength: '',
      maxlength: 'Ce numéro est trop long',
      validateLuhn: 'Ce numéro de siret n\'est pas valide'
    },
    organizationShareCapital: {
      pattern: 'Veuillez ecrire votre capital en chiffre.'
    },
    organizationRCSNumber: {

    },
    organizationAPENumber: {

    },
    organizationVATNumber: {
      pattern: 'Ce numéro de TVA ne semble pas valide.'
    },
    organizationVatRate: {
      required: 'Veuillez indiquer votre taux de TVA.',
      pattern: 'Veuillez ecrire votre taux de TVA en chiffre.'
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private invoiceSettingsService: InvoiceSettingsService,
    private spaceService: SpaceService) { }

  public ngOnInit(): void {
      this.invoiceSettingsService.getByOwnerId(this.spaceService.getUserId()).then((Business) => {
          // TODO : This is ugly, service should return one result in this case
        if (Business[0].hasOwnProperty('id')) {
          this.organization = Business[0];
        } else {
          this.organization = new Organization();
        }
        if (this.organization.legalStatus === null) {
            this.organization.legalStatus = '-1';
        }
        this.organizationLegalStatus = this.organization.legalStatus;

        this.buildForms();
    });
  }

  public onSubmitTvaRate() {
      this.loading = true;
      this.limitedOrganization = this.prepareTvaRate();
      this.invoiceSettingsService.updateVatRate( this.limitedOrganization ).subscribe((organization) => { this.organization = organization; this.loading = false; });

  }

  public onSubmit() {
      this.loading = true;
      this.limitedOrganization = this.prepareInvoiceNotice();
      this.invoiceSettingsService.updateInvoiceNotice( this.limitedOrganization )
                                .subscribe((organization) => {
                                    this.organization = organization;
                                    this.loading = false;
                                });
  }

  private prepareInvoiceNotice() {
      const form = this.invoiceNoticeForm;
      const formModel = this.invoiceNoticeForm.value;

      const limitedOrganization: Organization = new Organization();
      if (this.organization.id) {
        limitedOrganization.id = this.organization.id;
      }
      if (form.get('organizationLegalStatus').dirty) {
        limitedOrganization.legalStatus = formModel.organizationLegalStatus;
      }
      if (form.get('organizationSiret').dirty) {
        limitedOrganization.siret = formModel.organizationSiret;
      }
      if (form.get('organizationAPENumber').dirty) {
        limitedOrganization.APECode = formModel.organizationAPENumber;
      }
      if (form.get('organizationVATNumber').dirty) {
        limitedOrganization.vatNumber = formModel.organizationVATNumber;
      }
      if (form.get('organizationRCSNumber').dirty) {
        limitedOrganization.RCSNumber = formModel.organizationRCSNumber;
      }
      if (form.get('organizationShareCapital').dirty) {
        limitedOrganization.shareCapital = formModel.organizationShareCapital;
      }
      return limitedOrganization;
  }

  private prepareTvaRate() {
      const form = this.tvaRateForm;
      const formModel = this.tvaRateForm.value;

      const limitedOrganization: Organization = new Organization();
      if (this.organization.id) {
        limitedOrganization.id = this.organization.id;
      }
      if (form.get('organizationVatRate').dirty) {
        limitedOrganization.vatRate = formModel.organizationVatRate;
      }
      return limitedOrganization;
  }

  private buildForms(): void {
    this.buildTvaRateForm();
    this.buildInvoiceNoticeForm();
  }

  private buildTvaRateForm(): void {
    this.tvaRateForm = this.fb.group({
      organizationVatRate: [this.organization.vatRate, [
        Validators.required,
        Validators.pattern(/[0-9,.]*/)
      ]
      ],
    });

    this.tvaRateForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.tvaRateForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.tvaRateForm);
  }

  private buildInvoiceNoticeForm(): void {
    this.invoiceNoticeForm = this.fb.group({
      organizationLegalStatus: [this.organizationLegalStatus, [
      ]
      ],
      organizationSiret: [this.organization.siret, [
        Validators.minLength(14),
        Validators.maxLength(14),
        validateLuhn
      ]
      ],
      organizationShareCapital: [this.organization.shareCapital, [
        Validators.pattern(/^[0-9]*$/),
      ]
      ],
      organizationRCSNumber: [this.organization.RCSNumber, [
      ]
      ],
      organizationAPENumber: [this.organization.APECode, [
      ]
      ],
      organizationVATNumber: [this.organization.vatNumber, [
        Validators.pattern(/^(FR)?[0-9A-Z]{2}[0-9]{9}$/),
      ]
      ]
    });

    this.invoiceNoticeForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.invoiceNoticeForm, data));

    const organizationLegalStatusControl = this.invoiceNoticeForm.get('organizationLegalStatus');
    organizationLegalStatusControl.valueChanges.forEach(
      (value: string) => { this.organizationLegalStatus = value; }
    );
    // (re)set validation messages.
    this.onValueChanged(this.invoiceNoticeForm);
  }

  /*
   * Check if a form is valid
   */
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
