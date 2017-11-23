import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountManagerModule  } from '../account-manager/account-manager.module';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'welcome-partner',
    templateUrl: 'partner.component.html',
    styleUrls: ['partner.component.scss']
})

export class WelcomePartnerComponent implements OnInit {
    public showTopBar: boolean = true;
    public withHeaderOver: boolean = true;

    constructor(
        private router: Router,
        private spaceService: SpaceService
    ) {
    }

    public ngOnInit() {
        this.spaceService.toggleTopBar(false);
        this.spaceService.setHeaderAbove(true);
        console.log(this.withHeaderOver);
    }
}
