import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SpaceService } from '../_services/space.service';

@Component({
  selector: 'coach',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './coach.component.scss' ],
  template: `
    <coach-nav></coach-nav>
    <router-outlet></router-outlet>
  `
})
export class CoachComponent implements OnInit {
    constructor(private spaceService: SpaceService) {
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(false);
    }
}
