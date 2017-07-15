import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SpaceService } from '../_services/space.service';
import { AlertComponent } from '../_directives/index';

@Component({
  selector: 'member',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './member.component.scss' ],
  template: `
    <member-nav></member-nav>
    <router-outlet></router-outlet>
  `
})
export class MemberComponent implements OnInit {
    constructor(private spaceService: SpaceService) {
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(false);
    }
}
