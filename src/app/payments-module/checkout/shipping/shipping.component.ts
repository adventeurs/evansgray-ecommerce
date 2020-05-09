import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  customer;
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
  orderData: OrderData;

  constructor(
    public auth: AuthService,
    private cart: CartService,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe( user => this.customer = user)
  }

  proceed( value ){
    this.orderData = {
      customer: this.customer.stripeCustomerId,
      currency: 'usd',
      items: this.cart.storage,
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
