import { Component, Input } from '@angular/core';

import { Reservation } from '../../../models/index';

@Component({
  selector: 'reservations-list',
  templateUrl: 'reservations-list.component.html',
  styleUrls: ['reservations-list.component.scss']
})
export class ReservationsListComponent {
    @Input()
    public reservations: Reservation[];

    constructor() {
      // placeholder
    }
}
