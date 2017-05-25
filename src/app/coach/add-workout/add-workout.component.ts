import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutDateProvider } from '../workoutdate.provider';
import { Workout } from '../../models/workout';

@Component({
    selector: 'coach-add-workout',
    templateUrl: 'add-workout.component.html'
})

export class CoachAddWorkoutComponent implements OnInit {
    public newWorkout = new Workout();
    constructor(
        private router: Router,
        private WorkoutDateProvider: WorkoutDateProvider
    ) {

    }

    public ngOnInit(): void {
        this.newWorkout.startdate = this.WorkoutDateProvider.getDate();
    }
}
