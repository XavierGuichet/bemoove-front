import { Component, OnInit } from '@angular/core';

import { SpaceService } from '../../_services/index';

@Component({
  selector: 'reset-password',
  template: `
    <main>
        <router-outlet></router-outlet>
    </main>
  `
})

export class ResetPasswordComponent implements OnInit {
    constructor( private spaceService: SpaceService) {}

    public ngOnInit() {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(false);
    }
}
