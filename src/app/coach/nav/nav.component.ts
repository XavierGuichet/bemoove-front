import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'coach-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})

export class CoachNavComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
