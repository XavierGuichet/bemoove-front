import { Component, ViewEncapsulation } from '@angular/core';

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
export class CoachComponent {
    constructor(private spaceService: SpaceService) {
    }
}
