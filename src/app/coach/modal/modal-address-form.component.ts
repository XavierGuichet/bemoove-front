import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Address } from '../../models/address';

@Component({
    selector: 'modal-address-form',
    template: '<address-form [(model)]="model" (onSuccess)="onSuccess($event)"></address-form>'
})

export class ModalAddressFormComponent {
    public model: Address = new Address();
    public loading = false;
    public returnUrl: string;

    // @ViewChild('templateRef')
    // public templateRef: TemplateRef<any>;

    @Output()
    public onCreation = new EventEmitter<Address>();

    constructor(public dialog: MdDialog,
                public dialogRef: MdDialogRef<ModalAddressFormComponent>,
                private route: ActivatedRoute,
                private router: Router) {
        // dialog.setCloseGuard(this);
    }

    public onSuccess(success: boolean) {
        return success ? this.dialogRef.close(this.model) : '';
    }
}
