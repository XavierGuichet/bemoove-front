import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Coach } from '../../../models/index';
import { Link } from '../nav/link.model.ts';

import { CoachService } from '../../_services/index';

@Component({
  selector: 'coach',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./coach.component.scss'],
  template: `
  <div class="container-fluid">
    <div class="row">
      <nav-secondary [links]="menuList" class="col-2 secondary-navigation"></nav-secondary>
      <div class="col-10 main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `
})

export class CoachComponent implements OnInit {
  public menuList: any = [];

  constructor(private coachService: CoachService) {
    // TODO
  }

  public ngOnInit(): void {
    this.coachService.getMyCoaches().then((coaches) => {
      for (let coach of coaches) {
        this.menuList.push(new Link(coach.firstname + ' ' + coach.lastname, './' + coach.id + '/', 'person'));
      }
      this.menuList.push(new Link('AJOUTER UN COACH', './add', 'add_circle'));
    })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
