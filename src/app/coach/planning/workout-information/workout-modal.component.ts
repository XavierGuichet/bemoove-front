import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

// import { RegisterModalComponent  } from '../../register/modal/register-modal.component';

import { AlertService, UserService } from '../../../_services/index';

@Component({
    selector: 'workout-modal',
    templateUrl: './workout-modal.component.html',
    styleUrls: ['./workout-modal.component.scss']
})
export class WorkoutModalComponent {
    public workout: any = {};

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) public id: any,
        public dialog: MdDialog,
        public dialogRef: MdDialogRef<WorkoutModalComponent>,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
    }

    public editWorkout() {
        this.dialogRef.afterClosed().subscribe( () => {
          this.router.navigate(['/coach/workout', this.id, 'edit']);
        });
        this.dialogRef.close();
    }
}
