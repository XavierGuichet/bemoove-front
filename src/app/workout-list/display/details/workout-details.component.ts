import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    DomSanitizer,
    SafeHtml,
    SafeUrl,
    SafeStyle
} from '@angular/platform-browser';

import { Workout } from '../../../models/workout';
import { Booking } from '../../../models/booking';

import { SpaceService } from '../../../_services/space.service';
import { BookingService } from '../../../_services/booking.service';
import { WorkoutService } from '../../../_services/workout.service';
import { ProfileService } from '../../../_services/profile.service';

@Component({
  selector: 'workout-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-details.component.html',
  styleUrls: [ './workout-details.component.scss' ]
})

export class WorkoutDetailsComponent implements OnInit {
    public workout: Workout;
    public scrolled: boolean = false;
    public headerimage: any;
    private booking: Booking;
    constructor(
        private domSanitizer: DomSanitizer,
        private bookingService: BookingService,
        private workoutService: WorkoutService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute,
        private spaceService: SpaceService,
    ) {
        // TODO
    }

    public ngOnInit(): void {
        this.route.params
          .switchMap( (params: Params) => this.workoutService.getWorkout(+params['id']))
          .subscribe( (workout) => {
              this.workout = workout;
              this.headerimage =  this.domSanitizer.bypassSecurityTrustStyle(`url(${this.workout.photo.path})`);
            //  this.profileService.getByOwnerId(+params['id']);
          });
    }
}
