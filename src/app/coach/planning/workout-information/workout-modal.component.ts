import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Workout } from '../../../models/workout';

import { WorkoutService } from '../../../_services/workout.service';

import { AlertService, UserService } from '../../../_services/index';

@Component({
    selector: 'workout-modal',
    templateUrl: './workout-modal.component.html',
    styleUrls: ['./workout-modal.component.scss']
})
export class WorkoutModalComponent implements OnInit {
    public workout: Workout;
    public editable: boolean = false;

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) public id: any,
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<WorkoutModalComponent>,
        private router: Router,
        private workoutService: WorkoutService,
        private userService: UserService,
        private alertService: AlertService) {
    }

    public ngOnInit(): void {
        this.workoutService.getWorkout(this.id)
            .then( (workout) => {
                workout.startdate = new Date(workout.startdate);
                workout.enddate = new Date(workout.enddate);
                this.workout = workout;
                console.log(this.workout.startdate);
                this.editable = (this.workout.startdate > new Date());
            });
    }

    public editWorkout() {
        this.dialogRef.afterClosed().subscribe( () => {
          this.router.navigate(['/coach/workout', this.id, 'edit']);
        });
        this.dialogRef.close();
    }
}
