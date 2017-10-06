import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'planning',
  encapsulation: ViewEncapsulation.None,
  template: `
    <router-outlet></router-outlet>
  `
})

export class PlanningComponent implements OnInit {
    constructor() {
        // TODO
    }

    public ngOnInit(): void {
        // TODO
    }
}
