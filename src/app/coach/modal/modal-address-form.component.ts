import { Component, EventEmitter, Output, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Address }  from '../../models/address';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'modal-address-form',
    template: '<address-form [(model)]="model" (onSuccess)="onSuccess($event)"></address-form>'
})

export class ModalAddressForm implements CloseGuard, ModalComponent<BSModalContext> {
    context: BSModalContext;
    model: Address = new Address();
    loading = false;
    returnUrl: string;
    @ViewChild('templateRef') public templateRef: TemplateRef<any>;
    @Output() onCreation = new EventEmitter<Address>();

    constructor(public dialog: DialogRef<BSModalContext>,
                private route: ActivatedRoute,
                private router: Router) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    onSuccess(success: boolean) {
        success ? this.dialog.close(this.model) : '';
    }


}
