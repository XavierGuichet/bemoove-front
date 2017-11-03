import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Address } from '../../../models/address';

@Component({
    selector: 'modal-address-form',
    template: `<div class="form-card"><button mat-button class="modal-close" mat-dialog-close><mat-icon>close</mat-icon></button>
    <address-form (onSuccess)="onSuccess($event)"></address-form></div>`
})

export class ModalAddressFormComponent {
    public loading = false;
    public returnUrl: string;

    // @ViewChild('templateRef')
    // public templateRef: TemplateRef<any>;

    @Output()
    public onCreation = new EventEmitter<Address>();

    constructor(public dialog: MatDialog,
                public dialogRef: MatDialogRef<ModalAddressFormComponent>,
                private route: ActivatedRoute,
                private router: Router) {
        // dialog.setCloseGuard(this);
    }

    public onSuccess(address: Address) {
        return address ? this.dialogRef.close(address) : '';
    }
}
