import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

import { Workout } from '../../../models/workout';
import { WorkoutService } from '../../../_services/workout.service';

@Component({
  selector: 'workout-information',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-information.component.html',
  styleUrls: [ './workout-information.component.scss' ]
})

export class WorkoutInformationComponent implements OnInit {
    public workout: Workout;
    @Input()
    private id: number;
    constructor(
        private workoutService: WorkoutService
    ) {
        // TODO
    }

    public ngOnInit(): void {
        this.workoutService.getWorkout(this.id)
            .then( (workout) => this.workout = workout);
    }
}
