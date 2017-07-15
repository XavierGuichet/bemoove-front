import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'top-bar-partner-recruit',
    templateUrl: 'partner-recruit.component.html',
    styleUrls: ['partner-recruit.component.scss']
})

export class TopBarPartnerRecruitComponent {
    @Output()
    private showbar: EventEmitter<boolean> = new EventEmitter<boolean>();

    public removeBar() {
        this.showbar.emit(false);
    }
}
