import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SpaceService } from '../_services/space.service';

@Component({
  selector: 'partner',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./partner.component.scss', './partner-form.component.scss'],
  template: `
    <main>
        <nav-primary></nav-primary>
        <router-outlet></router-outlet>
    </main>
  `
})
export class PartnerComponent implements OnInit {
  constructor(private spaceService: SpaceService) {
  }

  public ngOnInit(): void {
    this.spaceService.toggleTopBar(false);
    this.spaceService.setHeaderAbove(false);
  }
}
