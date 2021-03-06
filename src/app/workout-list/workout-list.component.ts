import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SpaceService } from '../_services/index';

@Component({
  selector: 'workout-list',
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
        <router-outlet></router-outlet>
    </main>
  `
})
export class WorkoutListComponent implements OnInit {
    constructor(private spaceService: SpaceService) {
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(false);
    }
}
