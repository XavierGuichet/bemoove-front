import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Coach } from '../../../models/index';

import { CoachService } from '../../../_services/index';

@Component({
  selector: 'coach-dashboard',
  templateUrl: 'coach-dashboard.component.html'
})

export class CoachDashBoardComponent {
  public coaches: Coach[];

  constructor(
    private coachService: CoachService
  ) {
    // todo
  }

}
