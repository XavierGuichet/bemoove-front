import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Workout } from '../../../models/workout';

import { WorkoutService } from '../../../_services/workout.service';

@Component({
  selector: 'coach-workout-edit',
  templateUrl: 'workout-edit.component.html'
})

export class CoachWorkoutEditComponent implements OnInit {
  public editedWorkout: Workout;
  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

  }

  public ngOnInit(): void {
      this.route.params
        .switchMap( (params: Params) => this.workoutService.getWorkout(+params['id']))
        .subscribe( (workout) => {
            workout.startdate = new Date(workout.startdate);
            workout.enddate = new Date(workout.enddate);
            this.editedWorkout = workout;
        });
  }
}
