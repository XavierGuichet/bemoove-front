import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SpaceService } from '../_services/space.service';
import { AlertComponent } from '../_directives/index';

import { Link } from '../nav/nav.module';

@Component({
  selector: 'member',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './member.component.scss' ],
  template: `
  <main>
    <nav-primary [links]="primaryMenuLinks"></nav-primary>
    <router-outlet></router-outlet>
  </main>
  `
})

export class MemberComponent implements OnInit {
    public primaryMenuLinks: any = [
        new Link('Mes séances à venir', '/member/mes-seances', 'fitness_center'),
        new Link('Mon profil', '/member/profile', 'person')
    ];

    constructor(private spaceService: SpaceService) {
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(false);
    }
}
