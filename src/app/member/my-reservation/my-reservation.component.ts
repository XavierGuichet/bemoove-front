import { Component, OnInit } from '@angular/core';

import { Reservation } from '../../models/index';

import { ReservationService, PersonService } from '../../_services/index';

@Component({
  selector: 'my-reservation',
  templateUrl: 'my-reservation.component.html',
  styleUrls: ['my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {
  public reservations: Reservation[];
  constructor(
    private reservationService: ReservationService,
    private personService: PersonService
  ) { }

  public ngOnInit(): void {
      this.getCurrentReservation();
  }

  public tabChange(event) {
      this.reservations = [];

      if (event.index === 0) {
          this.getCurrentReservation();
      }
      if (event.index === 1) {
          this.getPastReservation();
      }

      console.log('tab Changed');
      console.log(event);
  }

  private getPastReservation() {
      this.personService.getMyPerson()
        .then( (person) => {
            return Promise.all([person, this.reservationService.getMyPastReservations(person.id)]);
        })
        .then( (results) => {
            this.reservations = results[1];
        });
  }

  private getCurrentReservation() {
      this.personService.getMyPerson()
        .then((person) => {
          return Promise.all([person, this.reservationService.getMyFutureReservations(person.id)]);
        })
        .then((results) => {
          this.reservations = results[1];
        });
  }

}
