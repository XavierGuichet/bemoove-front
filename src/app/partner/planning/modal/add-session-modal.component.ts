import { Component, EventEmitter, Output,  OnInit, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Workout, WorkoutInstance, Booking } from '../../../models/index';

import { AlertService,
         WorkoutService,
         BookingService } from '../../../_services/index';

@Component({
    selector: 'add-session-modal',
    template: '<button md-button class="modal-close" md-dialog-close><md-icon>close</md-icon></button><add-session-form [(workoutInstance)]="workoutInstance" (onSuccess)="onSuccess($event)"></add-session-form>'
})

export class AddSessionModalComponent {
    public workoutInstance: WorkoutInstance;

    @Output()
    public onCreation = new EventEmitter<WorkoutInstance>();

    constructor(@Optional() @Inject(MD_DIALOG_DATA) private data: any,
                public dialog: MdDialog,
                public dialogRef: MdDialogRef<AddSessionModalComponent>,
                private route: ActivatedRoute,
                private router: Router) {
        if (this.data.workoutInstance instanceof WorkoutInstance) {
            this.workoutInstance = this.data.workoutInstance;
        } else {
            this.workoutInstance = new WorkoutInstance();
        }
    }

    public onSuccess(workoutInstance: WorkoutInstance) {
        return workoutInstance ? this.dialogRef.close(workoutInstance) : '';
    }
}
