import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { WorkoutService, SpaceService } from '../../../_services/index';
import { Workout } from '../../../models/workout';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html'
})
export class WorkoutListComponent implements OnInit {
    public workouts: Workout[];
    constructor(private workoutService: WorkoutService,
                private spaceService: SpaceService) {

    }

    public ngOnInit(): void {
        // Recupère la liste des workouts (sans instance) du compte (pas du coach)
        this.workoutService.getMyWorkouts().then( (workouts) => this.workouts = workouts);
    }
}
