import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { resolve } from 'dns';

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

  async pay( stripe, card, orderData ){
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
        if(paymentData.requiresAction){
          this.notification.snackbarAlert('requires action');
        }
        else if (paymentData.error ){
          this.notification.snackbarAlert( paymentData.error)
        }
        else {
          completeOrder( paymentData.clientSecret );
        }
      }));    

      // Display order confirmation
      let completeOrder = ( clientSecret ) => { 
        stripe.retrievePaymentIntent(clientSecret)
          .then( res => {
            const receipt = this.auth.orderSuccess(res).then(data => resolve(data))

            this.router.navigate(['/success', { amount: receipt.amount, name: receipt.name, date: receipt.date, items: receipt.items}]);
          })
      }
  }

  // Create method to display order confirmation

  // Email customer order information and confirmation

  
}
