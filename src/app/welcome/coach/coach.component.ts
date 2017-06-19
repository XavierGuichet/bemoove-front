import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserManagerModule  } from '../user-manager/user-manager.module';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'welcome-coach',
    templateUrl: 'coach.component.html',
    styleUrls: ['coach.component.scss']
})

export class WelcomeCoachComponent implements OnInit {
    constructor(
        private router: Router,
        private spaceService: SpaceService
    ) {
    }

    public ngOnInit() {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(true);
    }
}
