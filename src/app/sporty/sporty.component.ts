import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'welcome-sporty',
    templateUrl: 'sporty.component.html'
})

export class WelcomeSportyComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {

    }


}
