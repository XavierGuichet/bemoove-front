import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessService } from '../../../_services/index';
import { Coach } from '../../../models/index';

@Component({
    selector: 'partner-coach-add',
    templateUrl: 'coach-add.component.html'
})

export class CoachAddComponent {
    public coach = new Coach();
    constructor(
        private businessService: BusinessService
    ) {
        this.businessService.getMyBusiness().then((business) => {
            this.coach.business = business;
        });
    }

}
