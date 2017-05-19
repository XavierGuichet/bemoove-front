import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'coach-edit-workout',
    templateUrl: 'edit-workout.component.html'
})

export class CoachEditWorkoutComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
