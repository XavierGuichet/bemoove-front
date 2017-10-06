import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'workout',
  encapsulation: ViewEncapsulation.None
  template: `
    <router-outlet></router-outlet>
  `
})

export class WorkoutComponent implements OnInit {
  constructor() {
    // TODO
  }

  public ngOnInit(): void {
    // TODO
  }
}
