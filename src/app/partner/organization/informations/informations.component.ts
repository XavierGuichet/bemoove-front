import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpaceService } from '../../../_services/space.service';

@Component({
  selector: 'organization-informations',
  templateUrl: 'informations.component.html'
})

export class OrganizationInformationsComponent implements OnInit {
  public model: any = {};

  constructor(
    private router: Router,
    private spaceService: SpaceService ) { }

  public ngOnInit(): void {
    // TODO ?
  }
}
