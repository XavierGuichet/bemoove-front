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
    './app.component.css',
    './main-themes.scss'
  ],
  template: `
    <top-bar-coach-recruit  *ngIf="showTopBar"
                        (showbar)="hideTopBar($event)"
                        class="toptoolbar"></top-bar-coach-recruit>
    <main [ngClass]="{'withToolBarAbove':showTopBar}">
        <header-nav></header-nav>
        <router-outlet></router-outlet>
    </main>
    <footer></footer>
  `
})
export class AppComponent {
    public showTopBar: boolean = true;

    constructor(
        public appState: AppState,
        private spaceService: SpaceService
    ) {
        this.spaceService.setTopBarEmitter.subscribe( (mode) => {
            if (mode !== null) {
              this.showTopBar = mode;
            }
        });
    }

    public hideTopBar(event) {
        this.spaceService.toggleTopBar(false);
    }
}
