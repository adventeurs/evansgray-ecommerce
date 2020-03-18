import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { MakePaymentComponent } from './checkout/make-payment/make-payment.component';
import { PaymentService } from './services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { ShippingComponent } from './checkout/shipping/shipping.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartDisplayComponent } from './checkout/cart-display/cart-display.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    ShippingComponent,
    MakePaymentComponent,
    CartDisplayComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    PaymentService,
    Location
  ],
  exports: [
    MakePaymentComponent,
    ShippingComponent,
    CartDisplayComponent,
    MakePaymentComponent,
    CheckoutComponent
  ]
})
export class PaymentModule { }
