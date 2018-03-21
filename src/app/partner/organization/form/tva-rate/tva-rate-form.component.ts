import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { BusinessService } from '../../../../_services/index';

import { Organization } from '../../../../models/index';

@Component({
  selector: 'tva-rate-form',
  templateUrl: './tva-rate-form.component.html'
})

export class TvaRateFormComponent extends BMReactFormComponent implements OnInit {
    @Input()
    public organization: Organization;

    public tvaRateForm: FormGroup;
    public formResult: any;
    public loading: boolean;
    public formReady: boolean = false;

    public formErrors = {
      TvaRate: '',
    };

    public validationMessages = {
      TvaRate: {
        required: 'Veuillez indiquer votre taux de TVA.',
        pattern: 'Veuillez ecrire votre taux de TVA en chiffre.'
      },
    };

    constructor(
      private fb: FormBuilder,
      private businessService: BusinessService) {
      super();
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    public onSubmit() {
      this.loading = true;
      this.hideFormResult();

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
      this.tvaRateForm = this.fb.group({
        TvaRate: [this.organization.vatRate, [
          Validators.required,
          Validators.pattern(/[0-9,.]*/)
        ]
        ],
      });

      this.tvaRateForm.valueChanges
        .subscribe((data) => this.onValueChanged(this.tvaRateForm, data));

      // (re)set validation messages.
      this.onValueChanged(this.tvaRateForm);

      this.formReady = true;
    }

    protected createNestedEntities(model: any): Promise<any> {
        return Promise.resolve(model);
    }

    protected createObjectFromModel() {
        const form = this.tvaRateForm;
        const formModel = this.tvaRateForm.value;

        const organization: Organization = new Organization();
        if (this.organization.id) {
          organization.id = this.organization.id;
        }
        if (form.get('TvaRate').dirty) {
          organization.vatRate = formModel.TvaRate;
        }

        return organization;
    }
}
