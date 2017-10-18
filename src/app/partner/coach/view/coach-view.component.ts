import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Coach } from '../../../models/index';

import { CoachService } from '../../../_services/index';

@Component({
  selector: 'coach-view',
  templateUrl: 'coach-view.component.html'
})

export class CoachViewComponent {
  public coach: Coach = new Coach();

  constructor(
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
              this.router.navigate(['/partner/coach/dashboard']);
          });
      }
  }
}
