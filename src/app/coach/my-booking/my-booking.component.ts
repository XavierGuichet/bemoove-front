import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

@Component({
    selector: 'coach-my-booking',
    templateUrl: 'my-booking.component.html'
})

export class CoachMyBookingComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        console.log('Coach My Booking on Init');
    }
}
