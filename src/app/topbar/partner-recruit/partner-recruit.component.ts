import { Component } from '@angular/core';
import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'top-bar-partner-recruit',
    templateUrl: 'partner-recruit.component.html',
    styleUrls: ['partner-recruit.component.scss']
})

export class TopBarPartnerRecruitComponent {
    public show: boolean = false;

    constructor(
        private spaceService: SpaceService
    ) {
        this.spaceService.setTopBarEmitter.subscribe( (mode) => {
            if (mode !== null) {
              this.show = mode;
            }
        });
    }

    public removeBar() {
        this.spaceService.toggleTopBar(false);
    }
}
