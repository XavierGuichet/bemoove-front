import { Component, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
    Cart,
    Coach,
    Workout,
    WorkoutInstance } from '../../models/index';

import {
    CartService,
    ProfileService,
    WorkoutService,
    WorkoutInstanceService } from '../../_services/index';

@Component({
  selector: 'order-success',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './success.component.html',
  // styleUrls: [ './workout-details.component.scss']
})

export class OrderSuccessComponent {

}
