import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Link } from '../link.model.ts';

@Component({
    selector: 'nav-primary',
    templateUrl: 'nav-primary.component.html',
    styleUrls: ['nav-primary.component.scss']
})

export class NavPrimaryComponent implements OnInit {
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
