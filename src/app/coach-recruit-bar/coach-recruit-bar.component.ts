import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'coach-recruit-bar',
    templateUrl: 'coach-recruit-bar.component.html',
    styleUrls: ['coach-recruit-bar.component.scss']
})

export class CoachRecruitBarComponent {
    @Output()
    private showbar: EventEmitter<boolean> = new EventEmitter<boolean>();

    public removeBar() {
        this.showbar.emit(false);
    }
}
