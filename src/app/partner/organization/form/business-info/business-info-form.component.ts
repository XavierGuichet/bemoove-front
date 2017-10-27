import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { Business } from '../../../../models/index';
import { BusinessService } from '../../../../_services/index';

@Component({
  selector: 'business-info-form',
  templateUrl: './business-info-form.component.html'
})

export class BusinessInfoFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

  public businessForm: FormGroup;
  @Input()
  public business: Business;

  public formErrors = {
    legalName: '',
    siret: '',
    vatNumber: '',
  };

  public validationMessages = {
    legalName: {
      required: 'Veuillez indiquer le nom de votre société',
    },
    siret: {

    },
    vatNumber: {

    }
  };

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    this.loading = true;
    this.hideFormResult();

    let business = this.createObjectFromModel();

    this.createNestedEntities(business).then(
      (businessWithCreatedNestedEntities) => {
        return Promise.all([
          businessWithCreatedNestedEntities,
          this.createOrUpdate(this.businessService, businessWithCreatedNestedEntities)
        ]);
      })
      .then((result) => {
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
      })
      .catch(this.handleError);
    //   this.showFormResult('error', 'Echec de la sauvegarde');
  }

  protected createNestedEntities(business: Business): Promise<Business> {
    return Promise.resolve(business);
  }

  protected buildForm(): void {
    this.businessForm = this.fb.group({
      legalName: [this.business.legalName, [
        Validators.required
      ]
      ],
      siret: [this.business.siret, [
        Validators.required
      ]
      ],
      vatNumber: [this.business.vatNumber, [
      ]
      ],
    });

    this.businessForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.businessForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.businessForm);

    this.formReady = true;
  }

  protected createObjectFromModel(): Business {
    const form = this.businessForm;
    const formModel = this.businessForm.value;

    const business = new Business();
    if (this.business.id) {
      business.id = this.business.id;
    }

    if (form.get('legalName').dirty) {
      business.legalName = formModel.legalName;
    }
    if (form.get('siret').dirty) {
      business.siret = formModel.siret;
    }
    if (form.get('vatNumber').dirty) {
      business.vatNumber = formModel.vatNumber;
    }

    return business;
  }
}
