import { Component, OnInit } from '@angular/core';

import { Reservation } from '../../models/index';

import { ReservationService, PersonService } from '../../_services/index';

@Component({
  selector: 'member-history',
  templateUrl: 'history.component.html'
})

export class MemberHistoryComponent implements OnInit {
  public reservations: Reservation[];
  constructor(
        private reservationService: ReservationService,
        private personService: PersonService
  ) { }

  public ngOnInit(): void {
      this.personService.getMyPerson()
        .then( (person) => {
            return Promise.all([person, this.reservationService.getMyPastReservations(person.id)]);
        })
        .then( (results) => {
            this.reservations = results[1];
        });
  }
}
