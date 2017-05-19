import { Component, ViewContainerRef, ViewEncapsulation, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SportySubscribeModalComponent } from '../modal/sporty-subscribe/sporty-subscribe-modal';

import { SpaceService } from '../_services/space.service';

// import { Workout }          from '../../models/workout';
// import { Day }          from '../../models/day';

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

    public showJoinUs() {
        let dialogRef = this.dialog.open(SportySubscribeModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
          //   this.selectedOption = result;
        });
    }
}
