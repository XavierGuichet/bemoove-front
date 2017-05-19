import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workout } from '../../models/workout';
import { WorkoutService } from '../../_services/workout.service';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'coach-my-workout',
    templateUrl: 'my-workout.component.html',
    styleUrls: [ 'my-workout.component.scss' ]
})

export class CoachMyWorkoutComponent implements OnInit {
    public commingWorkouts: Workout[];
    public pastWorkouts: Workout[];
    public coachid: number;

    constructor(
        private spaceService: SpaceService,
        private router: Router,
        private workoutService: WorkoutService
    ) { }

    public ngOnInit(): void {
        this.getCommingWorkoutByCoachId(this.spaceService.getUserId());
        // this.getPastWorkoutByCoachId(1);
    }

    public getCommingWorkoutByCoachId(id: number): void {
        this.workoutService.getCommingWorkoutByCoachId(id)
                   .then((workouts) => this.commingWorkouts = workouts);
    }

    public getPastWorkoutByCoachId(id: number): void {
        this.workoutService.getPastWorkoutByCoachId(id)
                   .then((workouts) => this.pastWorkouts = workouts);
    }

    public delete(workout: Workout): void {
        this.workoutService
            .delete(workout.id)
            .then(() => {
            this.commingWorkouts = this.commingWorkouts.filter((w) => w !== workout);
            this.pastWorkouts = this.pastWorkouts.filter((w) => w !== workout);
            // if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }

    get diagnostic() { return JSON.stringify(this.commingWorkouts); }
}
