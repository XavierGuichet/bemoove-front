import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    DomSanitizer,
    SafeHtml,
    SafeUrl,
    SafeStyle
} from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../form/bm-react-form/bm-react-form.component';

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
  selector: 'order-block',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './order-block.component.html',
  // styleUrls: [ './workout-details.component.scss']
})

export class OrderBlockComponent extends BMReactFormComponent implements OnInit {
    @Input()
    public workout: Workout;
    @Input()
    public workoutInstances: WorkoutInstance[] = new Array();
    public choosenWorkoutInstance: WorkoutInstance;
    public coach: Coach;
    public scrolled: boolean = false;
    public headerimage: any;

    public orderForm: FormGroup;
    public formErrors = {
      workoutInstance: '',
      wantedPlace: '',
      hasAcceptCGV: ''
    };

    public validationMessages = {
      workoutInstance: {
        required: 'Choissisez la date du cours souhaité',
      },
      wantedPlace: {
        required: 'Indiquez le nombre de place voulu',
      },
      hasAcceptCGV: {
        required: 'Vous devez accepter les CGV, avant de pouvoir reserver',
      }
    };

    private cart: Cart;

    constructor(
        private fb: FormBuilder,
        private domSanitizer: DomSanitizer,
        private cartService: CartService,
        private workoutService: WorkoutService,
        private workoutInstanceService: WorkoutInstanceService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.choosenWorkoutInstance = this.workoutInstances[0];
        this.buildForm();
    }

    public setWorkoutInstance() {
        // TODO
    }

    public onSubmit() {
      this.loading = true;
      let cart = this.createObjectFromModel();

      this.cartService.create(cart)
        .then( (cart) => {
            this.router.navigate(['order/' + this.orderForm.value.workoutInstance.workout.id + '/' + this.orderForm.value.workoutInstance.id]);
        });
    }

    protected buildForm() {
        this.orderForm = this.fb.group({
            workoutInstance: [this.choosenWorkoutInstance, Validators.required],
            wantedPlace: [1, Validators.required],
            hasAcceptCGV: [false, Validators.requiredTrue]
        });

        this.orderForm.valueChanges
          .subscribe((data) => this.onValueChanged(this.orderForm, data));

        this.onValueChanged(this.orderForm); // (re)set validation messages now

        this.formReady = true;
    }

    protected createNestedEntities(model: any): Promise<void> {
        return Promise.resolve(null);
    }

    protected createObjectFromModel(): Cart {
        let cart = new Cart();

        cart.workoutInstance = this.orderForm.value.workoutInstance;
        cart.nbBooking = this.orderForm.value.wantedPlace;

        return cart;
    }
}
