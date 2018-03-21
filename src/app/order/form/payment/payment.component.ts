import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  DomSanitizer,
  SafeHtml,
  SafeUrl,
  SafeStyle
} from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import {
  Address,
  Cart,
  Coach,
  Order,
  Payment,
  Person,
  Reservation,
  Workout,
  WorkoutInstance
} from '../../../models/index';

import {
  AddressService,
  CartService,
  ProfileService,
  WorkoutService,
  OrderService,
  ReservationService,
  PersonService,
  SpaceService,
  WorkoutInstanceService
} from '../../../_services/index';

@Component({
  selector: 'order-payment-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './payment.component.html'
})

export class OrderPaymentFormComponent extends BMReactFormComponent implements OnInit {
  @Input()
  public cart: Cart;
  @Output()
  public onSuccess = new EventEmitter<boolean>();
  public cartTotalAmountTaxIncl: number;
  public paymentForm: FormGroup;
  public formReady: boolean = false;

  public formErrors = {
    cardholder: '',
    cardNumber: '',
    cardValidityMonth: '',
    cardvalidityYear: '',
    cardSecurityCode: ''
  };

  public validationMessages = {
    cardholder: {
      required: ''
    },
    cardNumber: {
      required: ''
    },
    cardValidityMonth: {
      required: ''
    },
    cardvalidityYear: {
      required: ''
    },
    cardSecurityCode: {
      required: ''
    }
  };

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private workoutInstanceService: WorkoutInstanceService,
    private addressService: AddressService,
    private orderService: OrderService,
    private spaceService: SpaceService,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit() {
    // TODO : ngOnInit
    this.buildForm();
    this.calcCartTotalAmountTaxIncl();
  }

  public calcCartTotalAmountTaxIncl() {
      let taxRate = this.cart.workoutInstance.coach.business.vatRate;
      let productPriceTaxExcl = this.cart.workoutInstance.workout.price;
      let totalAmountTaxExcl = productPriceTaxExcl * this.cart.nbBooking;
      let totalAmountTaxIncl = totalAmountTaxExcl * (1 + taxRate / 100);

      this.cartTotalAmountTaxIncl = totalAmountTaxIncl;
  }

  public onSubmit(): void {
    // FIXME : it's a quick tmp solution only made for testing
    this.loading = true;
    this.hideFormResult();
    let payment = new Payment();
    payment.status = "SUCCEEDED";

    this.orderService.createOrderFromCart(this.cart, payment)
          .then((order) => {
              console.log(order);
          });

    // this.orderService.payOrder(this.order)
    //         .then((order) => this.order = order);

  }

  public createNestedEntities(person: Person): Promise<Person> {
    return Promise.resolve(person);
  }

  protected buildForm() {
    this.paymentForm = this.fb.group({
      cardholder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardValidityMonth: ['', Validators.required],
      cardvalidityYear: ['', Validators.required],
      cardSecurityCode: ['', Validators.required]
    });

    this.paymentForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.paymentForm, data));

    this.onValueChanged(this.paymentForm); // (re)set validation messages now

    this.formReady = true;
  }

  protected createObjectFromModel() {
    return null;
  }
}
