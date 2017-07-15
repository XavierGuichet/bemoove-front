import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'nav-primary',
    templateUrl: 'nav-primary.component.html',
    styleUrls: ['nav-primary.component.scss']
})

export class PartnerNavPrimaryComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
