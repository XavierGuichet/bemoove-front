import { Component, Input } from '@angular/core';

import { WorkoutInstance } from '../../../models/index';

@Component({
  selector: 'workout-summary',
  templateUrl: 'workout-summary.component.html',
  styleUrls: ['./workout-summary.component.scss']
})
export class WorkoutSummaryComponent {
  @Input()
  public workoutInstance: WorkoutInstance;
}
