import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'coach-profile',
    template: `
    <h1>profile componenet</h1>
    `
    // templateUrl: 'profile.component.html'
})

export class CoachProfileComponent implements OnInit {
    constructor(
        private router: Router,
        private spaceService: SpaceService
    ) { }

    public ngOnInit(): void {
        console.log('Coach Profile On Init');
    }
}
