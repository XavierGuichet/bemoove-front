import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { BusinessService, SpaceService } from '../../../_services/index';

import { Organization } from '../../../models/index';

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
  if ((sum % 10) === 0) {
    return null;
  }
  return { validateLuhn: { value } };
}

@Component({
  selector: 'invoice-settings',
  templateUrl: 'invoice-settings.component.html'
})

// TODO : split this form in two
export class InvoiceSettingsComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

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
    private businessService: BusinessService,
    private spaceService: SpaceService) {
    super();
  }

  public ngOnInit(): void {
    this.businessService.getMyBusiness().then((Business) => {
      // TODO : This is ugly, service should return one result in this case
      this.organization = Business;

      if (this.organization.legalStatus === null) {
        this.organization.legalStatus = '-1';
      }
      this.organizationLegalStatus = this.organization.legalStatus;

      this.buildForm();
    });
  }

  public onSubmitTvaRate() {
    this.loading = true;
    this.limitedOrganization = this.prepareTvaRate();
    this.businessService.update(this.limitedOrganization).then(
      (business) => {
        this.organization = business;
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
      },
      (error) => {
        this.showFormResult('error', 'Echec de la sauvegarde');
        this.loading = false;
      });
  }

  public onSubmit() {
    this.loading = true;
    this.limitedOrganization = this.prepareInvoiceNotice();
    this.businessService.update(this.limitedOrganization).then(
      (business) => {
        this.organization = business;
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
      },
      (error) => {
        this.showFormResult('error', 'Echec de la sauvegarde');
        this.loading = false;
      });
  }

  protected buildForm(): void {
    this.buildTvaRateForm();
    this.buildInvoiceNoticeForm();
  }

  protected createNestedEntities(model: any): Promise<any> {
      return Promise.resolve(model);
  }

  protected createObjectFromModel() {
      // empty
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
}
