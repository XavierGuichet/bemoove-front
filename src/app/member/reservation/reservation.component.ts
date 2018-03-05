import { Component, OnInit } from '@angular/core';

import { Reservation } from '../../models/index';

import { ReservationService } from '../../_services/index';

@Component({
  selector: 'member-reservation',
  templateUrl: 'reservation.component.html'
})

export class MemberReservationComponent implements OnInit {
  public reservations: Reservation[];
  constructor(
    private reservationService: ReservationService
  ) { }

  public ngOnInit(): void {
      this.reservationService.getMyReservations()
        .then( (reservations) => {
            this.reservations = reservations;
        });
  }
}
