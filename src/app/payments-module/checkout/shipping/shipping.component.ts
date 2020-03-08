import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { SubscriptionCollection } from 'src/app/models/subscriptionCollection';
import { unsubscriber } from 'src/app/services/utility'

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  cartTotal: Number;
  items;
  orderData: OrderData;
  customer;
  cartSub;
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
    private cart: CartService
  ) { }

  ngOnInit() {
    this.subscription['cart'] = 
                    this.cart.total.subscribe( total => {
                      this.cartTotal = total;
                    });
    this.subscription['stripeId'] = 
                    this.auth.user$.subscribe( user => 
                      this.customer = user
                      );
    this.subscription['stripeId'] = 
                    this.cart.displayCart.subscribe( cart =>
                      this.items = cart 
                      );
    // console.log(this.displayCart)
  }

  ngOnDestroy(){
    unsubscriber( ...Object.values(this.subscription) )
  }

  proceed( value ){
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
  }
}
