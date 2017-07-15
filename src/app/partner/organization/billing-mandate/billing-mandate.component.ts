import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpaceService } from '../../../_services/space.service';

@Component({
  selector: 'billing-mandate',
  templateUrl: 'billing-mandate.component.html'
})

export class BillingMandateComponent implements OnInit {
  public model: any = {};

  constructor(
    private router: Router,
    private spaceService: SpaceService ) { }

  public ngOnInit(): void {
    // TODO ?
  }
}
