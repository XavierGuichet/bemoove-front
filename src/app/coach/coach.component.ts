import { Component, ViewEncapsulation } from '@angular/core';

import { SpaceService } from '../_services/space.service';

@Component({
  selector: 'coach',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    // './app.component.css'
  ],
  template: `
    <coach-nav></coach-nav>
    <router-outlet></router-outlet>
  `
})
export class CoachComponent {
    constructor(private spaceService: SpaceService) {
    }
}
