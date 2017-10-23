import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RegexpValidator } from '../../../../_directives/regexp.directive';

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
  public limitedBusiness: Business;

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
    private businessService: BusinessService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
    super();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    this.loading = true;
    this.hideFormResult();

    this.limitedBusiness = this.prepareLimitedBusiness();

    this.businessService.update(this.limitedBusiness)
      .then((business) => {
        this.business = business;
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
      },
      (error) => {
        this.showFormResult('error', 'Echec de la sauvegarde');
        this.loading = false;
      });
  }

  private prepareLimitedBusiness(): Business {
    const form = this.businessForm;
    const formModel = this.businessForm.value;
    let limitedBusiness = new Business();

    if (this.business.id) {
      limitedBusiness.id = this.business.id;
    }
    if (form.get('legalName').dirty) {
      limitedBusiness.legalName = formModel.legalName;
    }
    if (form.get('siret').dirty) {
      limitedBusiness.siret = formModel.siret;
    }
    if (form.get('vatNumber').dirty) {
      limitedBusiness.vatNumber = formModel.vatNumber;
    }

    return limitedBusiness;
  }

  private buildForm(): void {
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
}
