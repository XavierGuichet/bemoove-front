import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Address, Person } from '../../models/index';

import { AlertService, PersonService } from '../../_services/index';

import { Link } from '../../nav/nav.module';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="container-fluid">
    <div class="row">
      <nav-secondary [links]="secondaryMenuLinks" class="col-2 secondary-navigation"></nav-secondary>
      <div class="col-10 main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `
})

export class ProfileComponent implements OnInit {
    public secondaryMenuLinks: any = [
        new Link('Identité', '/member/profile/identity', 'person'),
        new Link('Mes Coordonnées', '/member/profile/contact-information', 'domain'),
        new Link('Contact', '/member/profile/', 'person')
    ];
  public person: Person;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private personService: PersonService
  ) { }

  public ngOnInit(): void {
      this.personService.getMyPerson()
            .then((person) => this.person = person);
  }
}
