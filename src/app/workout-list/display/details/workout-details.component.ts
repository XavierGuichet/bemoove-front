import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    DomSanitizer,
    SafeHtml,
    SafeUrl,
    SafeStyle
} from '@angular/platform-browser';

import {
    Booking,
    Coach,
    Workout,
    WorkoutInstance } from '../../../models/index';

import {
    BookingService,
    ProfileService,
    SpaceService,
    WorkoutService,
    WorkoutInstanceService } from '../../../_services/index';

@Component({
  selector: 'workout-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-details.component.html',
  styleUrls: [ './workout-details.component.scss' ]
})

export class WorkoutDetailsComponent implements OnInit {
    public workout: Workout;
    public coach: Coach;
    public workoutInstances: WorkoutInstance[];
    public scrolled: boolean = false;
    public headerimage: any;
    private booking: Booking;
    constructor(
        private domSanitizer: DomSanitizer,
        private bookingService: BookingService,
        private workoutService: WorkoutService,
        private workoutInstanceService: WorkoutInstanceService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute,
        private spaceService: SpaceService,
    ) {
        // TODO
    }

    public ngOnInit(): void {
        this.route.params
          .switchMap( (params: Params) => {
              return this.workoutService.getWorkout(+params['idworkout']);
          })
          .subscribe( (workout) => {
              this.workout = workout;
              this.headerimage =  this.domSanitizer.bypassSecurityTrustStyle(`url(${this.workout.photoWide.path})`);
              this.workoutInstanceService.getBookableByWorkoutId(this.workout.id).then( (workoutInstances) => {
                  this.workoutInstances = workoutInstances;
                  if (this.workoutInstances[0].coach) {
                      this.coach = this.workoutInstances[0].coach;
                  }
              });
          });
    }
}
