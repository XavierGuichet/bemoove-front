import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'my-coach-profile',
    templateUrl: 'my-profile.component.html'
})

export class CoachMyProfileComponent implements OnInit {
    public model: any = {};
    constructor(
        private router: Router,
        private spaceService: SpaceService
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
