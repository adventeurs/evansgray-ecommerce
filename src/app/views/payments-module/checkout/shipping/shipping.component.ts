import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { SubscriptionCollection } from 'src/app/models/subscriptionCollection';
import { unsubscriber } from 'src/app/services/utility'
import { StatesService } from 'src/app/services/states.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StripeOrderObject } from 'src/app/models/stripeOrderObject';
import { User } from 'src/app/models/user';
import { resolve } from 'q';

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
  customer$;
  subscription: SubscriptionCollection = {};

  orderForm = new FormGroup({
    email: new FormControl('', []),
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
    private stateService: StatesService,
    private notification: NotificationService
  ) { 
  }

  ngOnInit() {
    this.subscription['cart'] = 
                    this.cart.total.subscribe( total => {
                      this.cartTotal = total;
                    });

    this.subscription['cartDisplay'] = 
                    this.cart.cartArray.subscribe( (cart: Product[]) =>
                      this.items = cart 
                      );
  
  }

  ngOnDestroy(){
    unsubscriber( ...Object.values(this.subscription) )
  }

  async proceedToPayment( value , user: User ){
    console.log(user)
    let orderObject;
    try{
      if(!user.stripeCustomerId){
        let customer = await this.auth.createStripeCustomer( value.name, value.email, user )
                                  .then( ( res: any ) => { return res.id } )   
        orderObject = this.createOrderObject( value, customer )
      } else{
        orderObject = this.createOrderObject( value, user.stripeCustomerId )

      }
    } catch( err ){
      this.notification.snackbarAlert( err )
    }

    this.orderEvent.emit(orderObject)
    this.closeEvent.emit(true)
  }


  createOrderObject( 
    { city, line1, line2, postal_code, state, name, email }: 
    { city: string, line1: string, line2: string, postal_code: number, 
      state: string, name: string, email: string }, 
    customer: string )
    : OrderData {

    let items = this.createStripeObject(this.items)

    return this.orderData = {
      email,
      customer,
      currency: 'usd',
      items: items,
      shipping: {
        address: {
          city,
          line1,
          line2,
          postal_code,
          state
        },
      name
      }
    }
  }

  createStripeObject( items: Product[] ): StripeOrderObject[]{

   let stripeOrderObject = items.map( (product: Product) => {  
                  let { parent, quantity, type } = product

                  return {
                    parent,
                    quantity,
                    type
                        };
                    });

    return stripeOrderObject;
  }
}
