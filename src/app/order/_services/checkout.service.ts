import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Cart, Order, Person } from '../../models/index';
import { CartService, OrderService, SpaceService } from '../../_services/index';

@Injectable()
export class CheckoutService {
  private cart: Cart = null;
  private order: Order;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private spaceService: SpaceService,
    private router: Router,
  ) { }

  public addToCart(workoutInstance: any, nbPlace: number) {
    let cart = new Cart();
    cart.workoutInstance = workoutInstance;
    cart.nbBooking = nbPlace;
    this.cartService.create(cart)
      .then((resCart) => {
        this.cart = resCart;
        this.goToNextStep();
      });
  }

  public getCurrentCart(): Promise<Cart> {
    if (this.cart !== null) {
      console.log('get cached cart');
      return Promise.resolve(this.cart);
    }
    return this.cartService.getMyCurrentCart().then((cart) => {
      this.cart = cart;
      return cart;
    });
  }

  public updateCurrentCart(cart: Cart): Cart {
    return this.cart = cart;
  }

  public updateCurrentCartMember(member: Person): Cart {
    this.cart.member = member;
    return this.cart;
  }

  public goToNextStep() {
    // not logged => authentification
    if (this.spaceService.getLogged() === false) {
      this.router.navigate(['order/checkout/step/login']);
    } else {
      this.cart = null;
      this.getCurrentCart().then( (cart) => {
        console.log(cart);
        console.log(this.cart);
        if(this.missingMemberInformation()) { // not enough user information => user information
          this.router.navigate(['order/checkout/step/my-information']);
        } else { // Cart ready for summary & to make order
          this.router.navigate(['order/checkout/step/summary']);
        }
      });
    }
    // Order payment suceeded => success
    // Order payment Failed => retry
  }

  public goToMyInformationsEdition() {
    this.router.navigate(['order/checkout/step/my-information']);
  }

  /**
   * @param Cart The cart used to create the order
   *
   * @returns Order
   */
  public createOrderFromCart(cart: Cart) {
    this.orderService.createOrderFromCart(cart)
      .then((order) => {
        let redirectURL = order.payment.transactionRedirectUrl;
        window.location.href = redirectURL;
      });
  }

  private missingMemberInformation(): boolean {
    console.log(this.cart.member);
    if (this.cart.member.firstname === null || this.cart.member.firstname.length === 0) {
      return true;
    }
    if (this.cart.member.lastname === null || this.cart.member.lastname.length === 0) {
      return true;
    }
    if (this.cart.member.nationality === null || this.cart.member.nationality.length === 0) {
      return true;
    }
    if (this.cart.member.phoneNumber === null || this.cart.member.phoneNumber.length === 0) {
      return true;
    }
    if (this.cart.member.address === null) {
      return true;
    }
    if (this.cart.member.address.firstline === null || this.cart.member.address.firstline.length === 0) {
      return true;
    }
    if (this.cart.member.address.postalCode === null || this.cart.member.address.postalCode.length === 0) {
      return true;
    }
    if (this.cart.member.address.city === null || this.cart.member.address.city.length === 0) {
      return true;
    }
    return false;
  }
}
