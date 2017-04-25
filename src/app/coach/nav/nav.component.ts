import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

@Component({
    selector: 'coach-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})

export class CoachNavComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        console.log('Coach nav On Init');
    }
}
