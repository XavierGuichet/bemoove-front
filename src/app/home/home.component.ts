import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { SpaceService } from '../_services/space.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    public showTopBar: boolean = true;
    public withHeaderOver: boolean = true;

    constructor(
        private router: Router,
        private spaceService: SpaceService
    ) {
    }

    public ngOnInit(): void {
        this.spaceService.setTopBarEmitter.subscribe( (mode) => {
            if (mode !== null) {
                console.log(mode);
              this.showTopBar = mode;
            }
        });

        this.spaceService.setHeaderAboveEmitter.subscribe( (mode) => {
            if (mode !== null) {
              this.withHeaderOver = mode;
            }
        });

        this.spaceService.toggleTopBar(true);
        this.spaceService.setHeaderAbove(true);
    }

    public gotolist(): void {
        this.router.navigate(['/workouts/view']);
    }
}
