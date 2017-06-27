import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutBlockComponent } from './workout-block/workout-block.component';

import { Workout } from '../../../models/workout';

import { WorkoutService } from '../../../_services/workout.service';
import { SpaceService } from '../../../_services/space.service';

@Component({
    selector: 'workout-list-display-maconnery',
    templateUrl: 'workout-list-display-maconnery.component.html',
    styleUrls: [ './workout-list-display-maconnery.component.scss' ]
})

export class WorkoutListMaconneryComponent implements OnInit {
    public workouts: Workout[] = new Array();
    constructor(
        private router: Router,
        private spaceService: SpaceService,
        private workoutService: WorkoutService
    ) { }

    public ngOnInit(): void {
        this.loadWorkouts();
        // TODO
    }

    public loadWorkouts(): void {
        this.workoutService.getWorkouts()
                   .then((workouts) => {
                       this.workouts = workouts;
                       console.log(this.workouts);
                   });
    }
}
