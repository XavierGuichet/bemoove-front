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
    './app.component.scss'
  ],
  template: `
    <top-bar-coach-recruit  *ngIf="showTopBar"
                        (showbar)="hideTopBar($event)"
                        class="toptoolbar"></top-bar-coach-recruit>
    <header-nav></header-nav>
    <main [ngClass]="{'withToolBarAbove':showTopBar,'withHeaderAbove':withHeaderAbove}">
        <router-outlet></router-outlet>
    </main>
    <footer></footer>
  `
})
export class AppComponent {
    public showTopBar: boolean = true;
    public withHeaderAbove: boolean = true;

    constructor(
        public appState: AppState,
        private spaceService: SpaceService
    ) {
        this.spaceService.setTopBarEmitter.subscribe( (mode) => {
            if (mode !== null) {
              this.showTopBar = mode;
            }
        });
        this.spaceService.setHeaderAboveEmitter.subscribe( (value) => {
            if (value !== null) {
              this.withHeaderAbove = value;
            }
        });
    }

    public hideTopBar(event) {
        this.spaceService.toggleTopBar(false);
    }
}
