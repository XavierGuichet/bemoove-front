import { Component, EventEmitter, Output,  OnInit, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Workout, WorkoutInstance, Booking } from '../../../models/index';

import { AlertService,
         WorkoutService,
         BookingService } from '../../../_services/index';

@Component({
    selector: 'add-session-modal',
    template: '<button mat-button class="modal-close" mat-dialog-close><mat-icon>close</mat-icon></button><add-session-form [(workoutInstance)]="workoutInstance" (onSuccess)="onSuccess($event)"></add-session-form>'
})

export class AddSessionModalComponent {
    public workoutInstance: WorkoutInstance;

    @Output()
    public onCreation = new EventEmitter<WorkoutInstance>();

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: any,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<AddSessionModalComponent>,
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
