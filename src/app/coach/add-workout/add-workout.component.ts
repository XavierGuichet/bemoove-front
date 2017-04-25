import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { Workout }  from '../../models/workout';

@Component({
    selector: 'coach-add-workout',
    templateUrl: 'add-workout.component.html'
})

export class CoachAddWorkoutComponent implements OnInit {
    public newWorkout = new Workout();
    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        console.log('Coach add Workout on Init');
    }
}
