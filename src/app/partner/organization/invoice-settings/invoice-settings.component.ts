import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpaceService } from '../../../_services/space.service';

@Component({
  selector: 'invoice-settings',
  templateUrl: 'invoice-settings.component.html'
})

export class InvoiceSettingsComponent implements OnInit {
  public model: any = {};

  constructor(
    private router: Router,
    private spaceService: SpaceService ) { }

  public ngOnInit(): void {
    // TODO ?
  }
}
