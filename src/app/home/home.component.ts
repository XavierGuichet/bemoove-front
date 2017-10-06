import { Component, ViewContainerRef, ViewEncapsulation, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SpaceService } from '../_services/space.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    constructor(
        public dialog: MdDialog,
        private router: Router,
        private spaceService: SpaceService
    ) {
    }

    public ngOnInit(): void {
        this.spaceService.toggleTopBar(true);
        this.spaceService.setHeaderAbove(true);
    }

    public gotolist(): void {
        this.router.navigate(['/workouts/view']);
    }
}
