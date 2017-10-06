import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CoachService, SpaceService } from '../../../_services/index';
import { Coach } from '../../../models/index';

@Component({
    selector: 'partner-coach-edit',
    templateUrl: 'coach-edit.component.html'
})

export class CoachEditComponent {
    public coach: Coach;
    constructor(
        private spaceService: SpaceService,
        private coachService: CoachService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params
          .switchMap( (params: Params) => this.coachService.getById(+params['id']))
          .subscribe( (coach) => {
              this.coach = coach;
          });
    }

    public deleteCoach() {
        if (confirm('Êtes vous sur de vouloir supprimer ce coach ?')) {
            this.coachService.delete(this.coach.id).subscribe( (data) => {
                this.router.navigate(['/partner/coach/list']);
            });
        }
    }
}
