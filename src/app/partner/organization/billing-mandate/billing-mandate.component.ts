import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { BillingMandateSign } from '../../../models/index';
import { BillingMandateSignService } from '../../../_services/index';

@Component({
  selector: 'billing-mandate',
  templateUrl: 'billing-mandate.component.html'
})

export class BillingMandateComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

  public billingMandateSign: BillingMandateSign;
  public billingMandateSignForm: FormGroup;

  public hasSign: boolean = false;

  public formErrors = {
      approved: ''
  };

  public validationMessages = {
      approved: {
          required: 'Veuillez confirmer votre approbation avant d\'approuver'
      }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billingMandateSignService: BillingMandateSignService ) {
        super();
    }

  public ngOnInit(): void {
    // TODO ?
    this.billingMandateSignService.hasSign().then( (billingMandateSign) => {
        if (billingMandateSign !== null) {
            this.billingMandateSign = billingMandateSign;
            this.hasSign = true;
        } else {
            this.buildForm();
            this.formReady = true;
        }
    });
  }

  public onSubmit() {
      this.loading = true;
      this.hideFormResult();

      this.billingMandateSignService.sign().then( (billingMandateSign) => {
          if (billingMandateSign) {
              this.billingMandateSign = billingMandateSign;
              this.hasSign = true;
          }
          this.loading = false;
      });
  }

  protected buildForm() {
      this.billingMandateSignForm = this.fb.group({
          approved: [false, [ Validators.requiredTrue ]]
      });

      this.billingMandateSignForm.valueChanges
        .subscribe((data) => this.onValueChanged(this.billingMandateSignForm, data));

      // (re)set validation messages.
      this.onValueChanged(this.billingMandateSignForm);
  }

  protected createNestedEntities(model: any): Promise<void> {
      return Promise.resolve(null);
  }

  protected createObjectFromModel() {
      // nothing
  }
}
