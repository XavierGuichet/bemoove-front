import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { BusinessService } from '../../../_services/index';

import { Organization } from '../../../models/index';

@Component({
  selector: 'invoice-settings',
  templateUrl: 'invoice-settings.component.html'
})

export class InvoiceSettingsComponent implements OnInit {
  public organization: Organization;
  public organizationLegalStatus: string;

  constructor(
    private router: Router,
    private businessService: BusinessService) {
  }

  public ngOnInit(): void {
    this.businessService.getMyBusiness().then((Business) => {
      this.organization = Business;
    });
  }
}
