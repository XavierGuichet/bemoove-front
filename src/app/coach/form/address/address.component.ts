import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Address } from '../../../models/address';

import { AddressService } from '../../../_services/address.service';

@Component({
  selector: 'address-form',
  templateUrl: 'address.component.html'
})

export class AddressFormComponent {
    @Input()
    public model: Address;
    @Output()
    public onSuccess = new EventEmitter<boolean>();
    public loading: boolean = false;

    constructor(private addressService: AddressService) {}

    public addAddress() {
        this.loading = true;
        this.addressService.create(this.model).subscribe(
            (data) => {
                this.loading = false;
                this.onSuccess.emit(true);
            },
            (error) => {
                this.loading = false;
            });
    }
}
