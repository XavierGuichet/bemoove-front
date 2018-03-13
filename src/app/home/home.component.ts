import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutInstance } from '../models/index';
import { SpaceService, WorkoutInstanceService } from '../_services/index';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    public showTopBar: boolean = true;
    public withHeaderOver: boolean = true;

    public workoutInstances: WorkoutInstance[];

    constructor(
        private router: Router,
        private workoutInstanceService: WorkoutInstanceService,
        private spaceService: SpaceService
    ) {
    }

    public ngOnInit(): void {
        this.spaceService.setTopBarEmitter.subscribe( (mode) => {
            if (mode !== null) {
              this.showTopBar = mode;
            }
        });

        this.spaceService.setHeaderAboveEmitter.subscribe( (mode) => {
            if (mode !== null) {
              this.withHeaderOver = mode;
            }
        });

        this.spaceService.toggleTopBar(true);
        this.spaceService.setHeaderAbove(true);

        this.getCommingWorkout();
    }

    public gotolist(): void {
        this.router.navigate(['/workouts/view']);
    }

    private getCommingWorkout() {
        let today = new Date();
        let in7day = new Date();
        in7day.setDate(today.getDate() + 7);
        this.workoutInstanceService.getWorkoutInstancesByDateInterval(today, in7day)
                .then( (workoutInstances) => this.workoutInstances = workoutInstances.slice(0, 3));
    }
}
