import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SpaceService } from '../_services/space.service';

import { Link } from '../nav/nav.module';

@Component({
  selector: 'partner',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./partner.component.scss', './partner-form.component.scss'],
  template: `
    <main>
        <nav-primary [links]="primaryMenuLinks"></nav-primary>
        <router-outlet></router-outlet>
    </main>
  `
})

export class PartnerComponent implements OnInit {
    public primaryMenuLinks: any = [
        new Link('Entreprise', '/partner/organization', 'domain'),
        new Link('Coachs', '/partner/coach', 'person'),
        new Link('Plannings', '/partner/planning', 'today'),
        new Link('Séances', '/partner/workouts', 'view_list'),
        new Link('Ma compta', '/partner/accounting', 'euro_symbol'),
    ];

  constructor(private spaceService: SpaceService) {
  }

  public ngOnInit(): void {
    this.spaceService.toggleTopBar(false);
    this.spaceService.setHeaderAbove(false);
  }
}
