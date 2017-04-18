import { Component, ViewContainerRef, ViewEncapsulation, OnInit  } from '@angular/core';
import { Router }   from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { SportySubscribeModalComponent  }
                from '../../modal/sporty-subscribe/sporty-subscribe-modal';

import { SpaceService } from '../../_services/space.service';

// import { Workout }          from '../../models/workout';
// import { Day }          from '../../models/day';

@Component({
    selector: 'welcome-search',
    providers: [Modal],
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
})

export class WelcomeSearchComponent implements OnInit {
    constructor(
        overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
        private router: Router,
        private spaceService: SpaceService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(true);
    }

    public showJoinUs() {
        return this.modal.open(SportySubscribeModalComponent,
            overlayConfigFactory({ showClose: false, isBlocking: false},
                                    BSModalContext));
    }
}
