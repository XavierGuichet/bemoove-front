import { Component, ViewEncapsulation, Input } from '@angular/core';

import { Workout } from '../../../../models/workout';
import { Booking } from '../../../../models/booking';
// import { User } from '../../../../models/user';

import { SpaceService } from '../../../../_services/space.service';
import { BookingService } from '../../../../_services/booking.service';
// import { AccountService } from '../../../../_services/account.service';

@Component({
  selector: 'workout-block',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-block.component.html',
  styleUrls: [ './workout-block.component.scss' ]
})

export class WorkoutBlockComponent {
    @Input()
    public workout: Workout;
    private booking: Booking;
    // private account: Account;
    constructor(
        private bookingService: BookingService,
        // private accountService: AccountService,
        private spaceService: SpaceService,
    ) {
        // TODO
    }

    public bookWorkout(): void {
        // let userId = this.spaceService.getUserId();
        // this.accountService.getById(userId).subscribe(
        //     (data) => {
        //         this.user = data;
        //         this.booking = new Booking(this.user, this.workout, 1);
        //         this.bookingService.create(this.booking)
        //             .subscribe(
        //                 (data) => {
        //                 },
        //                 (error) => {
        //                 });
        //     },
        //     (error) => {
        //     });
    }
}
