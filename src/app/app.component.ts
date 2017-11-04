import { Component, Input, ViewEncapsulation, HostListener } from '@angular/core';

import { AppState } from './app.service';

import { SpaceService } from './_services/space.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
      './main-themes.scss',
    './app.component.scss',
    './app.color.tools.scss',
    './app.various.tools.scss'
  ],
  template: `
    <top-bar-partner-recruit class="toptoolbar"></top-bar-partner-recruit>
    <header-nav></header-nav>
    <router-outlet></router-outlet>
    <footer></footer>
  `
})
export class AppComponent {
    public withHeaderOver: boolean = true;

    constructor(
        public appState: AppState,
        private spaceService: SpaceService
    ) {
        // this.spaceService.setHeaderAboveEmitter.subscribe( (value) => {
        //     if (value !== null) {
        //       this.withHeaderOver = value;
        //     }
        // });
    }
}
