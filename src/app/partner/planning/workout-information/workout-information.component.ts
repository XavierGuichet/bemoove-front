import { Component, ViewEncapsulation, Input } from '@angular/core';

import { Workout } from '../../../models/index';

@Component({
  selector: 'workout-information',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-information.component.html',
  styleUrls: [ './workout-information.component.scss' ]
})

export class WorkoutInformationComponent {
    @Input()
    public workout: Workout;
    @Input()
    private id: number;

    constructor(
    ) {
        // TODO
    }
}
