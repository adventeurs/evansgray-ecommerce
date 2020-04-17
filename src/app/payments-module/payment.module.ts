import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { MakePaymentComponent } from './checkout/make-payment/make-payment.component';
import { PaymentService } from './services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { ShippingComponent } from './checkout/shipping/shipping.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartDisplayComponent } from './checkout/cart-display/cart-display.component';
import { ShippingInfoComponent } from '../shared/shipping-info/shipping-info.component'
import { RefundInfoComponent } from '../shared/refund-info/refund-info.component'
import { SuccessComponent } from './checkout/success/success.component';
import { Routes, RouterModule } from '@angular/router';
import { MdComponentsModule } from '../md-components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DollarsPipe } from '../shared/pipes/dollars.pipe';
import { InventoryPipe } from '../shared/pipes/inventory.pipe';

const appRoutes: Routes = [
  
  { path: 'checkout', 
    component: CheckoutComponent,
      children: [{
        path: 'success/:email/:amount', 
        component: SuccessComponent 
        }],
      data: { animation: 'Checkout'}
  }
]
@NgModule({
  declarations: [
    CheckoutComponent,
    ShippingComponent,
    MakePaymentComponent,
    CartDisplayComponent,
    SuccessComponent,
    DollarsPipe,
    InventoryPipe
  ],
  entryComponents: [
    ShippingInfoComponent,
    RefundInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MdComponentsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    PaymentService,
    Location,
  ],
  exports: [
    MakePaymentComponent,
    ShippingComponent,
    CartDisplayComponent,
    MakePaymentComponent,
    CheckoutComponent,
    SuccessComponent,
    DollarsPipe,
    InventoryPipe
    ]
})
export class PaymentModule { }
