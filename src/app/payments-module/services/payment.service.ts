import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root' 
})
export class PaymentService {

  // TODO: create stripe user
  // TODO: create stripe order
  // TODO: process payment stripe
  stripe: any;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private notification: NotificationService,
    private router: Router
  ) { 
  }

  pay( stripe, card, orderData ){
    stripe.createPaymentMethod( 'card', card )
      .then( res => {
        if ( res.error ) {
          res.subscribe( err => console.log(err))
        }
        else {
          orderData['paymentMethodId'] = res.paymentMethod.id;
          return this.http.post('http://localhost:3000/payment', orderData )
        }
      })
      .then( res => res
        .subscribe( paymentData => {
          console.log(paymentData)
        if(paymentData.intent.requiresAction){
          this.notification.snackbarAlert('requires action');
        }
        else if (paymentData.intent.error ){
          this.notification.snackbarAlert( paymentData.error)
        }
        else {
          completeOrder( paymentData.intent.clientSecret, paymentData.order );
        }
      }));    

      // Display order confirmation
      let completeOrder = ( clientSecret, order ) => { 
        stripe.retrievePaymentIntent(clientSecret)
          .then( async res => {
            await this.auth.orderSuccess({ paymentIntent: res, order })
            await this.http.post('/confirmation', order)
            this.router.navigate(['/','checkout','success', order.email, order.amount ])
          })
      }
  }

  
}
