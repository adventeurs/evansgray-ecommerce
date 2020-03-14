import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { SubscriptionCollection } from 'src/app/models/subscriptionCollection';
import { unsubscriber } from 'src/app/services/utility'
import { StatesService } from 'src/app/services/states.service';
import { User } from 'firebase';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  cartTotal: Number;
  items: Product[];
  orderData: OrderData;
  @Output() orderEvent = new EventEmitter<OrderData>()
  @Output() closeEvent = new EventEmitter<boolean>();
  @Input() close: boolean;
  customer;
  states: String[];
  subscription: SubscriptionCollection = {};

  orderForm = new FormGroup({
    name: new FormControl( '', [

    ]),
    line1: new FormControl( '' , [
      Validators.required
    ]),
    line2: new FormControl( '' , [
      
    ]),
    city: new FormControl( '', [
      Validators.required
    ]),
    postal_code: new FormControl( '', [
      Validators.required
    ]),
    state: new FormControl( '', [
      Validators.required
    ])
  }) 
  

  constructor(
    public auth: AuthService,
    private cart: CartService,
    private stateService: StatesService
  ) { 
  }

  ngOnInit() {
    this.subscription['cart'] = 
                    this.cart.cartTotal.subscribe( total => {
                      this.cartTotal = total;
                    });
    this.subscription['stripeId'] = 
                    this.auth.user$.subscribe( ( user: User ) => 
                      this.customer = user
                      );
    this.subscription['cartDisplay'] = 
                    this.cart.cart.subscribe( (cart: Product[]) =>
                      this.items = cart 
                      );
    
    this.states = this.stateService.getStates();
  }

  ngOnDestroy(){
    unsubscriber( ...Object.values(this.subscription) )
  }

  proceedToPayment( value ){
    this.orderData = {
      customer: this.customer.stripeCustomerId,
      currency: 'usd',
      items: this.items,
      shipping: {
        address: {
          city: value.city,
          line1: value.line1,
          line2: value.line2,
          postal_code: value.postal_code,
          state: value.state
        },
      name: value.name
      }
    }

    this.orderEvent.emit(this.orderData)
    this.closeEvent.emit(true)
  }
}
