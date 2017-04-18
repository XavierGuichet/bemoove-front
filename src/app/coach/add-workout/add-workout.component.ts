import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { Workout }  from '../../models/workout';

@Component({
    selector: 'coach-add-workout',
    templateUrl: 'add-workout.component.html'
})

export class CoachAddWorkoutComponent implements OnInit {
    newWorkout = new Workout();
    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {

    }


}
