import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { BusinessService } from '../../../../_services/index';

import { Organization } from '../../../../models/index';

import { validateLuhn } from '../../../../form/validators/luhn.validator';

@Component({
  selector: 'invoice-notice-form',
  templateUrl: './invoice-notice-form.component.html'
})

export class InvoiceNoticeFormComponent extends BMReactFormComponent implements OnInit {
    @Input()
    public organization: Organization;
    public selectedLegalStatus: string;

    public invoiceNoticeForm: FormGroup;
    public formResult: any;
    public loading: boolean;
    public formReady: boolean = false;

    public formErrors = {
      LegalStatus: '',
      Siret: '',
      ShareCapital: '',
      RcsNumber: '',
      ApeNumber: '',
      VatNumber: ''
    };

    public validationMessages = {
      LegalStatus: {
        required: 'Vous devez choisir le status legal de votre activité.'
      },
      Siret: {
        minlength: '',
        maxlength: 'Ce numéro est trop long',
        validateLuhn: 'Ce numéro de siret n\'est pas valide'
      },
      ShareCapital: {
        pattern: 'Veuillez ecrire votre capital en chiffre.'
      },
      RcsNumber: {

      },
      ApeNumber: {

      },
      VatNumber: {
        pattern: 'Ce numéro de TVA ne semble pas valide.'
      }
    };

    constructor(
      private fb: FormBuilder,
      private businessService: BusinessService) {
      super();
    }

    public ngOnInit(): void {
        if (this.organization.legalStatus === null) {
          this.organization.legalStatus = '-1';
        }
        this.selectedLegalStatus = this.organization.legalStatus;

        this.buildForm();
    }

    public onSubmit() {
        this.loading = true;
        let organization = this.createObjectFromModel();
        this.businessService.update(organization).then(
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

    public buildForm(): void {
        this.invoiceNoticeForm = this.fb.group({
          LegalStatus: [this.selectedLegalStatus, [
          ]
          ],
          Siret: [this.organization.siret, [
            Validators.minLength(14),
            Validators.maxLength(14),
            validateLuhn
          ]
          ],
          ShareCapital: [this.organization.shareCapital, [
            Validators.pattern(/^[0-9]*$/),
          ]
          ],
          RcsNumber: [this.organization.RCSNumber, [
          ]
          ],
          ApeNumber: [this.organization.APECode, [
          ]
          ],
          VatNumber: [this.organization.vatNumber, [
            Validators.pattern(/^(FR)?[0-9A-Z]{2}[0-9]{9}$/),
          ]
          ]
        });

        this.invoiceNoticeForm.valueChanges
          .subscribe((data) => this.onValueChanged(this.invoiceNoticeForm, data));

        const LegalStatusControl = this.invoiceNoticeForm.get('LegalStatus');
        LegalStatusControl.valueChanges.forEach(
          (value: string) => { this.selectedLegalStatus = value; }
        );
        // (re)set validation messages.
        this.onValueChanged(this.invoiceNoticeForm);

        this.formReady = true;
    }

    protected createObjectFromModel() {
      const form = this.invoiceNoticeForm;
      const formModel = this.invoiceNoticeForm.value;

      const limitedOrganization: Organization = new Organization();
      if (this.organization.id) {
        limitedOrganization.id = this.organization.id;
      }
      if (form.get('LegalStatus').dirty) {
        limitedOrganization.legalStatus = formModel.LegalStatus;
      }
      if (form.get('Siret').dirty) {
        limitedOrganization.siret = formModel.Siret;
      }
      if (form.get('ApeNumber').dirty) {
        limitedOrganization.APECode = formModel.ApeNumber;
      }
      if (form.get('VatNumber').dirty) {
        limitedOrganization.vatNumber = formModel.VatNumber;
      }
      if (form.get('RcsNumber').dirty) {
        limitedOrganization.RCSNumber = formModel.RcsNumber;
      }
      if (form.get('ShareCapital').dirty) {
        limitedOrganization.shareCapital = formModel.ShareCapital;
      }
      return limitedOrganization;
    }

    protected createNestedEntities(model: any): Promise<any> {
        return Promise.resolve(model);
    }
}
