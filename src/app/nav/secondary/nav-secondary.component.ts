import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Link } from '../link.model.ts';

@Component({
    selector: 'nav-secondary',
    templateUrl: 'nav-secondary.component.html',
    styleUrls: ['nav-secondary.component.scss']
})

export class NavSecondaryComponent implements OnInit {
    @Input()
    public links: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
