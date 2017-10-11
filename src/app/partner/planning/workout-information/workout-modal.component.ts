import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Workout, Booking } from '../../../models/index';

import { AlertService,
         WorkoutService,
         BookingService } from '../../../_services/index';

@Component({
    selector: 'workout-modal',
    templateUrl: './workout-modal.component.html',
    styleUrls: ['./workout-modal.component.scss']
})

export class WorkoutModalComponent implements OnInit {
    public workout: Workout;
    public bookings: Booking[];
    public editable: boolean = false;

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) public id: any,
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<WorkoutModalComponent>,
        private router: Router,
        private workoutService: WorkoutService,
        private alertService: AlertService,
        private bookingService: BookingService) {
    }

    public ngOnInit(): void {
        this.workoutService.getWorkout(this.id)
            .then( (workout) => {
                // workout.startdate = new Date(workout.startdate);
                // workout.enddate = new Date(workout.enddate);
                // this.workout = workout;
                // this.editable = (this.workout.startdate > new Date());
                // this.bookingService.getAll()
                //     .then( (bookings) => {
                //         this.bookings = bookings;
                //     });
            });
    }

    public editWorkout() {
        this.dialogRef.afterClosed().subscribe( () => {
          this.router.navigate(['/partner/workout', this.id, 'edit']);
        });
        this.dialogRef.close();
    }
}
