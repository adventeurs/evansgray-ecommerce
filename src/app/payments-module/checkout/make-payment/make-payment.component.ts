import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData'
import {Location} from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})

export class MakePaymentComponent implements OnInit {
  @ViewChild('cardElement', {static: false}) cardElement: ElementRef;
  @Input() orderData: OrderData ;
  @Output() closeEvent = new EventEmitter<boolean>();
  loading: boolean = false;
  stripe: any;
  handler: any;
  card;

  constructor(
      public auth: AuthService,
      public stripePayment: PaymentService,
      public location: Location,
      private cart: CartService
      ) { 
        
      }

  ngOnInit(){
      const stripe = Stripe(environment.stripeKey);
      const elements = stripe.elements();

      const style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

      this.card = elements.create('card', { style: style });
      this.card.mount('#card-element');
      this.card.addEventListener( 'submit', ()=>{
        this.loading = true;
        this.stripePayment.pay( stripe, this.card, this.orderData);
      })

     document.getElementById('submit').addEventListener('click', ()=>{
        this.loading = true;
        this.stripePayment.pay( stripe, this.card, this.orderData);
      })
  }

  ngOnDestroy(){
    this.loading = false
  }

  returnToShipping(){
    this.closeEvent.emit(false)
  }

}


























// // Handle form submission.
// var form = document.getElementById('payment-form');
// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error.
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server.
//       stripeTokenHandler(result.token);
//     }
//   });
// });

// // Submit the form with the token ID.
// function stripeTokenHandler(token) {
//   // Insert the token ID into the form so it gets submitted to the server
//   var form = document.getElementById('payment-form');
//   var hiddenInput = document.createElement('input');
//   hiddenInput.setAttribute('type', 'hidden');
//   hiddenInput.setAttribute('name', 'stripeToken');
//   hiddenInput.setAttribute('value', token.id);
//   form.appendChild(hiddenInput);

//   // Submit the form
//   form.submit();
// }
    
//   }

// // Create Payment Intent
// async createPaymentIntent( currency, convertedCart ) {
//   try{
//     const response = await fetch('payment_intents', {
//       method: 'POST',
//       headers: {'Conent-Type': 'appilication/json'},
//       body: JSON.stringify({
//         currency,
//         convertedCart
//       })
//     });
//     const data = await response.json();

//     if(data.error){
//       return {error: data.error}
//     } else {
//       return data;
//     }
//   } catch(err){
//     return {error: err.message}
//   }
// }
