import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { MakePaymentComponent } from './checkout/make-payment/make-payment.component';
import { PaymentService } from './services/payment.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
 
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
    MakePaymentComponent
  ]
})
export class PaymentModule { }
