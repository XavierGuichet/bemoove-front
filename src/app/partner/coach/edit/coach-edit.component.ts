import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CoachService } from '../../../_services/index';
import { Coach } from '../../../models/index';

@Component({
    selector: 'partner-coach-edit',
    templateUrl: 'coach-edit.component.html'
})

export class CoachEditComponent {
    public coach: Coach;
    constructor(
        private coachService: CoachService,
        private route: ActivatedRoute
    ) {
        this.route.params
          .switchMap( (params: Params) => this.coachService.getById(+params['id']))
          .subscribe( (coach) => {
              this.coach = coach;
          });
    }
}
