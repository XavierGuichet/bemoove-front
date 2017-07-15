import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Link } from '../nav/link.model.ts';

@Component({
  selector: 'organization',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./organization.component.scss'],
  template: `
  <div class="container-fluid">
    <div class="row">
      <nav-secondary [links]="menuList" class="col-2 secondary-navigation"></nav-secondary>
      <div class="col-10 main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `
})

export class OrganizationComponent implements OnInit {
    public menuList: any = [
        new Link('Coordonnées', 'informations', 'domain'),
        new Link('TVA & Mentions légales', 'invoice-settings', 'business_center'),
        new Link('Coordonnées bancaire', 'bank-account', 'payment'),
        new Link('Mandat de facturation', 'billing-mandate', 'description')];

  constructor() {
    // TODO
  }

  public ngOnInit(): void {
    // TODO
  }
}
