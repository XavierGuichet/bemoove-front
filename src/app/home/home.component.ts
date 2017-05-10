import { Component, ViewContainerRef, ViewEncapsulation, OnInit  } from '@angular/core';
import { Router }   from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { SportySubscribeModalComponent  }
                from '../modal/sporty-subscribe/sporty-subscribe-modal';

import { SpaceService } from '../_services/space.service';

// import { Workout }          from '../../models/workout';
// import { Day }          from '../../models/day';

@Component({
    selector: 'home',
    providers: [Modal],
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    constructor(
        overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
        private router: Router,
        private spaceService: SpaceService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(true);
        this.spaceService.setZone('home');
    }

    public showJoinUs() {
        return this.modal.open(SportySubscribeModalComponent,
            overlayConfigFactory({ showClose: false, isBlocking: false},
                                    BSModalContext));
    }
}
