import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { OrderData } from 'src/app/models/orderData'
import {Location} from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { ConfigService } from 'src/app/services/config.service';

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
      public location: Location
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

























