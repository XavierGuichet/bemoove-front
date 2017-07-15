import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'member-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})

export class MemberNavComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        // TODO
    }
}
