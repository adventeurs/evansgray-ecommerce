import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { ProductService } from "./services/product.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ProductPageComponent } from "./views/product-page/product-page.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginModalComponent } from "./shared/header/login-modal/login-modal.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdComponentsModule } from "./md-components.module";
import { SearchFilterComponent } from "./views/shop/search-filter/search-filter.component";
import { ProductCardComponent } from "./shared/product-card/product-card.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ShippingInfoComponent } from "./shared/shipping-info/shipping-info.component";
import { RefundInfoComponent } from "./shared/refund-info/refund-info.component";
import { AdminAuthGaurd } from "./services/adminauthgaurd.service";
import { StatesService } from "./services/states.service";
import { AuthService } from "./services/auth.service";
import { PaymentService } from "./payments-module/services/payment.service";
import { MobileNavComponent } from "./shared/header/mobile-nav/mobile-nav.component";
import { PaymentModule } from "./payments-module/payment.module";
import { environment } from "src/environments/environment.prod";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductPageComponent,
    LoginModalComponent,
    SearchFilterComponent,
    ProductCardComponent,
    ShippingInfoComponent,
    RefundInfoComponent,
    routingComponents,
    SearchFilterComponent,
    MobileNavComponent
  ],
  entryComponents: [ShippingInfoComponent, RefundInfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "evansgray"),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    ScrollingModule,
    PaymentModule
  ],
  providers: [
    ProductService,
    PaymentService,
    AdminAuthGaurd,
    StatesService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
