import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Booking, WorkoutInstance } from '../../../../models/index';

import { BookingService, SpaceService } from '../../../../_services/index';

@Component({
  selector: 'workout-block',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-block.component.html',
  styleUrls: [ './workout-block.component.scss' ]
})

export class WorkoutBlockComponent {
    @Input()
    public workoutinstance: WorkoutInstance;
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
        this.router.navigate(['/workouts/view/' + this.workoutinstance.workout.id]);
        return;
    }

    get diagnostic() {
        return JSON.stringify(this.workoutinstance);
    }
}
