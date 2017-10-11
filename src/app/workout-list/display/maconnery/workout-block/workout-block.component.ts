import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Workout } from '../../../../models/workout';
import { Booking } from '../../../../models/booking';

import { SpaceService } from '../../../../_services/space.service';
import { BookingService } from '../../../../_services/booking.service';

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
        private router: Router,
        private spaceService: SpaceService,
    ) {
        // TODO
    }

    public viewWorkout(): void {
        this.router.navigate(['/workouts/view/' + this.workout.id]);
        return;
    }
        // OLD BOOKWORKOUT()
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
