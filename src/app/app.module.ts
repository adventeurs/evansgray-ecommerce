import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentService } from "./payments-module/services/payment.service";
import { PaymentModule } from "./payments-module/payment.module";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { ProductService } from "./services/product.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductPageComponent } from "./views/product-page/product-page.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdComponentsModule } from "./md-components.module";
import { SearchFilterComponent } from "./views/shop/search-filter/search-filter.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { AdminAuthGaurd } from "./services/adminauthgaurd.service";
import { StatesService } from "./services/states.service";
import { AuthService } from "./services/auth.service";
import { environment } from "src/environments/environment.prod";
import { ApronComponent } from "./views/home/slides/apron.component";
import { ScrunchieComponent } from "./views/home/slides/scrunchie.component";
import { RibbonComponent } from "./views/home/slides/ribbon.component";
import { HeroHomeComponent } from "./views/home/components/hero-home.component";
import { CatHomeComponent } from "./views/home/components/cat-home.component";
import { TimelessComponent } from "./views/home/components/timeless.component";
import { JoinComponent } from "./views/home/components/join.component";
import { NotionsComponent } from "./views/shop/components/notions.component";
import { BespokeComponent } from "./views/home/components/bespoke.component";
import { NaturalColorComponent } from "./views/home/components/natural-color.component";
import { ShopAllComponent } from "./views/shop/components/shop-all.component";
import { ForBodyComponent } from "./views/shop/components/for-body.component";
import { ForHomeComponent } from "./views/shop/components/for-home.component";
import { RibbonFeatureComponent } from "./views/shop/components/ribbonFeature.component";
import { AboutComponent } from "./views/about/about.component";
import { ContactComponent } from "./views/contact/contact.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    SearchFilterComponent,
    routingComponents,
    SearchFilterComponent,
    ApronComponent,
    ScrunchieComponent,
    RibbonComponent,
    HeroHomeComponent,
    CatHomeComponent,
    TimelessComponent,
    JoinComponent,
    BespokeComponent,
    NaturalColorComponent,
    ShopAllComponent,
    NotionsComponent,
    ForBodyComponent,
    ForHomeComponent,
    RibbonFeatureComponent,
    AboutComponent,
    ContactComponent
  ],
  entryComponents: [
    ApronComponent,
    ScrunchieComponent,
    RibbonComponent,
    ShopAllComponent,
    NotionsComponent,
    ForBodyComponent,
    ForHomeComponent,
    RibbonFeatureComponent
  ],
  imports: [
    SharedModule,
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
