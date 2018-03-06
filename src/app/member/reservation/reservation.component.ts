import { Component, OnInit } from '@angular/core';

import { Reservation } from '../../models/index';

import { ReservationService, PersonService } from '../../_services/index';

@Component({
  selector: 'member-reservation',
  templateUrl: 'reservation.component.html'
})

export class MemberReservationComponent implements OnInit {
  public reservations: Reservation[];
  constructor(
    private reservationService: ReservationService,
    private personService: PersonService
  ) { }

  public ngOnInit(): void {
    this.personService.getMyPerson()
      .then((person) => {
        return Promise.all([person, this.reservationService.getMyFutureReservations(person.id)]);
      })
      .then((results) => {
        this.reservations = results[1];
      });
  }
}
