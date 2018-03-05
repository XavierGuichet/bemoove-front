import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Reservation, Workout } from '../../../models/index';

import { AlertService,
         WorkoutService,
         ReservationService } from '../../../_services/index';

@Component({
    selector: 'workout-modal',
    templateUrl: './workout-modal.component.html',
    styleUrls: ['./workout-modal.component.scss']
})

export class WorkoutModalComponent implements OnInit {
    public workout: Workout;

    public reservations: Reservation[];
    public editable: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public id: any,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<WorkoutModalComponent>,
        private router: Router,
        private workoutService: WorkoutService,
        private alertService: AlertService,
        private reservationService: ReservationService
    ) {
    }

    public ngOnInit(): void {
        this.workoutService.getWorkout(this.id)
            .then( (workout) => {
                // workout.startdate = new Date(workout.startdate);
                // workout.enddate = new Date(workout.enddate);
                // this.workout = workout;
                // this.editable = (this.workout.startdate > new Date());
                // this.cartService.getAll()
                //     .then( (bookings) => {
                //         this.bookings = cart;
                //     });
            });
        this.reservationService.getReservationsByWorkoutInstanceId(this.id)
                .then( (reservations) => this.reservations = reservations );
    }

    public editWorkout() {
        this.dialogRef.afterClosed().subscribe( () => {
          this.router.navigate(['/partner/workout', this.id, 'edit']);
        });
        this.dialogRef.close();
    }
}
