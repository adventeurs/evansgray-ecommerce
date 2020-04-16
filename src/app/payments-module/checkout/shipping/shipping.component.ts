import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData';
import { Product } from 'src/app/models/product';
import { StatesService } from 'src/app/services/states.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StripeOrderObject } from 'src/app/models/stripeOrderObject';
import { User } from 'src/app/models/user';
import { httpify } from 'caseless';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  @Input() cartTotal: Number;
  @Input() items: Product[];
  @Output() orderEvent = new EventEmitter<OrderData>()
  @Output() closeEvent = new EventEmitter<boolean>();
  @Input() close: boolean;
  // orderData: OrderData;

  orderForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl( '', [
      Validators.required
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
  
    get email(){
      return this.orderForm.get('email')
    }

    get name(){
      return this.orderForm.get('name')
    }

    get line1(){
      return this.orderForm.get('line1')
    }

    get city(){
      return this.orderForm.get('city')
    }

    get postalCode(){
      return this.orderForm.get('postal_code')
    }

    get state(){
      return this.orderForm.get('state')
    }

  constructor(
    public auth: AuthService,
    private stateService: StatesService,
    private notification: NotificationService,
    private http: HttpClient
  ) { 
  }

  async proceedToPayment( value , user: User ){
    let orderObject: OrderData;
    try{
      if(!user.stripeCustomerId){
        let customer = await this.auth.createStripeCustomer( value.name, value.email, user )
                                  .then( ( res: any ) => { return res.id } )  
                                  .catch( error => console.log(error)) 
        orderObject = this.createOrderObject( value, customer )
      } else{
        orderObject = this.createOrderObject( value, user.stripeCustomerId )
       }

      this.orderEvent.emit(orderObject)
      this.closeEvent.emit(true)

    } catch( err ){
      this.notification.snackbarAlert( err )
    }

  }


  createOrderObject( 
    { city, line1, line2, postal_code, state, name, email }: 
    { city: string, line1: string, line2: string, postal_code: number, 
      state: string, name: string, email: string 
    }, 
      customer: string 
    ) : OrderData {

    let items = this.createStripeObject(this.items)
 
    return {
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
