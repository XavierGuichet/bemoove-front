import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountManagerModule  } from '../account-manager/account-manager.module';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'partner-registration',
    templateUrl: 'partner-registration.component.html',
    styleUrls: ['partner-registration.component.scss']
})

export class PartnerRegistrationComponent implements OnInit {
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
