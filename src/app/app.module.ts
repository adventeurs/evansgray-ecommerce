import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { ProductService } from './services/product.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app/app.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShopComponent } from './views/shop/shop.component';
import { MakePaymentComponent } from './payments-module/checkout/make-payment/make-payment.component';
import { DollarsPipe } from './shared/pipes/dollars.pipe';
import { AccountComponent } from './views/account/account.component';
import { ProductPageComponent } from './views/product-page/product-page.component'
import { PaymentService } from './payments-module/services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginModalComponent } from './shared/header/login-modal/login-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdComponentsModule } from './md-components.module';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './views/success/success.component';
import { CheckoutComponent } from './payments-module/checkout/checkout.component';
import { CartDisplayComponent } from './payments-module/checkout/cart-display/cart-display.component';
import { PaymentModule } from './payments-module/payment.module';
import { ShippingComponent } from './payments-module/checkout/shipping/shipping.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    MakePaymentComponent,
    DollarsPipe,
    AccountComponent,
    ProductPageComponent,
    LoginModalComponent,
    CheckoutComponent,
    ShippingComponent,
    MakePaymentComponent,
    CartDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'evansgray'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    RouterModule.forRoot([
      { 
        path: '', component: HomeComponent 
      },
      { 
        path: 'shop', component: ShopComponent 
      },
      { 
        path: 'product/:sku', component: ProductPageComponent 
      },
      { 
        path: 'checkout', component: CheckoutComponent 
      },
      { 
        path: 'about', component: AboutComponent 
      },
      { 
        path: 'account/:uid', component: AccountComponent 
      },
      // { 
      //   path: 'category/:category', component: CategoryComponent 
      // },
      // { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [ 
    ProductService,
    PaymentService 
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
