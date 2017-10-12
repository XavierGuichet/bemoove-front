import { Component, OnInit } from '@angular/core';

import { BusinessService } from '../../../_services/index';

import { Business } from '../../../models/index';

@Component({
  selector: 'business-informations',
  templateUrl: 'informations.component.html'
})

export class OrganizationInformationsComponent implements OnInit {
  public business: Business;
  public formResult: any;

  constructor(
    private businessService: BusinessService
) { }

  public ngOnInit(): void {
    this.businessService.getMyBusiness().then((Business) => {
        this.business = Business;
    },
       (error) => {
           this.showFormResult('error', 'Le service a rencontré une erreur ou n\'a pas pu trouver votre société.');
       });
  }

  private showFormResult(type: string, title: string, content: string = '') {
      this.formResult = { type, title, content};
  }
}
