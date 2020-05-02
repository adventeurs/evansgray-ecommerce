import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductPageComponent } from "./views/product-page/product-page.component";
import { ShopComponent } from "./views/shop/shop.component";
import { HomeComponent } from "./views/home/home.component";
import { AccountComponent } from "./views/account/account.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { AdminAuthGaurd } from "./services/adminauthgaurd.service";
import { CheckoutComponent } from "./views/checkout/checkout.component";
import { SuccessComponent } from "./views/checkout/success/success.component";
import { ShippingComponent } from "./views/checkout/shipping/shipping.component";
import { MakePaymentComponent } from "./views/checkout/make-payment/make-payment.component";
import { CartDisplayComponent } from "./views/checkout/cart-display/cart-display.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent, data: { routeAnimation: 1 } },
  { path: "shop", component: ShopComponent, data: { routeAnimation: 2 } },
  {
    path: "product/:sku",
    component: ProductPageComponent,
    data: { animation: "Product" }
  },
  { path: "account/:uid", component: AccountComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AdminAuthGaurd]
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    children: [
      {
        path: "success/:email/:amount",
        component: SuccessComponent
      }
    ],
    data: { animation: "Checkout" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  AccountComponent,
  DashboardComponent,
  HomeComponent,
  ShopComponent,
  ProductPageComponent,
  CheckoutComponent,
  ShippingComponent,
  MakePaymentComponent,
  CartDisplayComponent,
  SuccessComponent
];
