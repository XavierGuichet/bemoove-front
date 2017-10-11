import { Component, OnInit } from '@angular/core';

import { BusinessService } from '../../../_services/index';

import { Business } from '../../../models/index';

@Component({
  selector: 'business-informations',
  templateUrl: 'informations.component.html'
})

export class OrganizationInformationsComponent implements OnInit {
  public business: Business;

  constructor(
    private businessService: BusinessService
) { }

  public ngOnInit(): void {
    this.businessService.getMyBusiness().then((Business) => {
        this.business = Business;
    });
  }
}
