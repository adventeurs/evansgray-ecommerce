import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/models/user';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' 
})
export class PaymentService {

  // TODO: create stripe user
  // TODO: create stripe order
  // TODO: process payment stripe
   
  customerId: any;
  userId: string;
  stripe: any;

  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    // public auth: AuthService,
    private http: HttpClient,
    private notification: NotificationService
  ) { 
    this.fireAuth.authState  
          .subscribe((auth) => {
            if (auth) {
              this.userId = auth.uid
              }
          });

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
          console.log('requires action');
        }
        else if (paymentData.error ){
          console.log(paymentData.error)
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
            const paymentIntent = res.paymentIntent;
            const paymentIntentJson = JSON.stringify( paymentIntent, null, 2 )
           
            // call display method here 
            // console.log( paymentIntent )
          })
      }
  }

  // Create method to display order confirmation

  // Email customer order information and confirmation

  
}
