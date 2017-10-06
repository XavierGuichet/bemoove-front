import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'coach',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./coach.component.scss'],
  template: `
    <router-outlet></router-outlet>
  `
})

export class CoachComponent implements OnInit {
  constructor() {
    // TODO
  }

  public ngOnInit(): void {
    // TODO
  }
}
