import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { ProductService } from './services/product.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShopComponent } from './views/shop/shop.component';
import { MakePaymentComponent } from './views/payments-module/checkout/make-payment/make-payment.component';
import { DollarsPipe } from './shared/pipes/dollars.pipe';
import { AccountComponent } from './views/account/account.component';
import { ProductPageComponent } from './views/product-page/product-page.component'
import { PaymentService } from './views/payments-module/services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginModalComponent } from './shared/header/login-modal/login-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdComponentsModule } from './md-components.module';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './views/payments-module/checkout/checkout.component';
import { CartDisplayComponent } from './views/payments-module/checkout/cart-display/cart-display.component';
import { ShippingComponent } from './views/payments-module/checkout/shipping/shipping.component';
import { SearchFilterComponent } from './views/shop/search-filter/search-filter.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ShippingInfoComponent } from './shared/shipping-info/shipping-info.component';
import { RefundInfoComponent } from './shared/refund-info/refund-info.component';
import { SuccessComponent } from './views/payments-module/checkout/success/success.component'
import { AdminAuthGaurd } from './services/adminauthgaurd.service';
import { StatesService } from './services/states.service';
import { AuthService } from './services/auth.service';



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
    CartDisplayComponent,
    SearchFilterComponent,
    ProductCardComponent,
    DashboardComponent,
    ShippingInfoComponent,
    RefundInfoComponent,
    SuccessComponent
  ],
  entryComponents: [
    ShippingInfoComponent,
    RefundInfoComponent
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
    ScrollingModule,
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
        path: 'checkout', component: CheckoutComponent,
        children: [
          { path: 'success/:email/:amount', component: SuccessComponent}
        ] 
      },
      { 
        path: 'about', component: AboutComponent 
      },
      { 
        path: 'account/:uid', component: AccountComponent 
      },
      { 
        path: 'dashboard', component: DashboardComponent,
        canActivate: [ AdminAuthGaurd ]
      },
      // { 
      //   path: 'category/:category', component: CategoryComponent 
      // },
      // { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [ 
    ProductService,
    PaymentService,
    AdminAuthGaurd,
    StatesService,
    AuthService,

  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
