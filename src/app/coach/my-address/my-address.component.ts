import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { Address } from '../../models/address';
import { AddressService }   from '../../_services/address.service';

import { SpaceService } from '../../_services/space.service';

@Component({
    selector: 'coach-my-address',
    templateUrl: 'my-address.component.html'
})

export class CoachMyAddressComponent implements OnInit {
    addresses: Address[];

    constructor(
        private router: Router,
        private spaceService: SpaceService,
        private addressService: AddressService
    ) { }

    ngOnInit(): void {
        this.getAddressesByCoachId(this.spaceService.getUserId());
    }

    getAddressesByCoachId(id: number) {
        this.addressService.getAddressesByCoachId(id)
                   .then(addresses => this.addresses = addresses);
    }

    get diagnostic() { return JSON.stringify(this.addresses); }
}
