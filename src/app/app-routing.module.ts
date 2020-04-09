import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './payments-module/checkout/checkout.component';
import { SuccessComponent } from './payments-module/checkout/success/success.component';
import { ProductPageComponent } from './views/product-page/product-page.component';
import { ShopComponent } from './views/shop/shop.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { AccountComponent } from './views/account/account.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AdminAuthGaurd } from './services/adminauthgaurd.service';
import { ShippingComponent } from './payments-module/checkout/shipping/shipping.component';
import { MakePaymentComponent } from './payments-module/checkout/make-payment/make-payment.component';
import { CartDisplayComponent } from './payments-module/checkout/cart-display/cart-display.component';


const routes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  { path: 'home', 
    component: HomeComponent,
    data: { animation: 'HomePage'}
  },
  { path: 'shop', 
    component: ShopComponent,
    data: { animation: 'Shop'}
  },
  { path: 'product/:sku', 
    component: ProductPageComponent,
    data: { animation: 'Product'}
  },
  { path: 'checkout', 
    component: CheckoutComponent,
      children: [{
        path: 'success/:email/:amount', 
        component: SuccessComponent 
        }],
      data: { animation: 'Checkout'}
  },
  { path: 'about', 
    component: AboutComponent,
    data: { animation: 'About'}
  },
  { path: 'account/:uid', 
    component: AccountComponent
  },
  { path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [ AdminAuthGaurd ]
  },
// { 
//   path: 'category/:category', component: CategoryComponent 
// },
// { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [
  CheckoutComponent,
  ShippingComponent,
  MakePaymentComponent,
  CartDisplayComponent,
  SuccessComponent,
  AboutComponent,
  AccountComponent,
  DashboardComponent,
  HomeComponent,
  ShopComponent,
  ProductPageComponent
]