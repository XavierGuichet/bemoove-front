import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'coach-workout-edit',
    templateUrl: 'workout-edit.component.html'
})

export class CoachWorkoutEditComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
