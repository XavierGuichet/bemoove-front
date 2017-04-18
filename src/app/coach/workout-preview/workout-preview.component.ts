import { Component, Input } from '@angular/core';

import { Workout }          from '../../models/workout';

@Component({
    selector: 'workout-preview',
    templateUrl: 'workout-preview.component.html',
    styleUrls: ['workout-preview.component.css']
})

export class WorkoutPreviewComponent {
    constructor () {}

    @Input()
    workout: Workout;
}
