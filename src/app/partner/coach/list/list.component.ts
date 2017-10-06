import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Coach } from '../../../models/index';

import { CoachService } from '../../../_services/index';

@Component({
  selector: 'coach-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {
  public coaches: Coach[];

  constructor(
    private coachService: CoachService
  ) {
    // todo
  }

  public ngOnInit(): void {
    this.coachService.getMyCoaches().then((coaches) => {
      this.coaches = coaches;
    });
  }
}
