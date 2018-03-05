import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart, WorkoutInstance } from '../../../models/index';

import { CartService } from '../../../_services/index';

@Component({
  selector: 'workout-block',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-block.component.html',
  styleUrls: [ './workout-block.component.scss' ]
})

export class WorkoutBlockComponent {
    @Input()
    public workoutinstance: WorkoutInstance;
    private cart: Cart;
    // private account: Account;
    constructor(
        private cartService: CartService,
        private router: Router
    ) {
        // TODO
    }

    public viewWorkout(): void {
        this.router.navigate(['/workouts/' + this.workoutinstance.workout.id + '/' + this.workoutinstance.id]);
        return;
    }

    get diagnostic() {
        return JSON.stringify(this.workoutinstance);
    }
}
