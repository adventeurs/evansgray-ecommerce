import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CarouselComponent,
  CarouselItemElement
} from "./carousel/carousel.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";
import { DollarsPipe } from "./pipes/dollars.pipe";
import { InventoryPipe } from "./pipes/inventory.pipe";
import { ProductCardComponent } from "./product-card/product-card.component";
import { CarouselItemDirective } from "./carousel-item.directive";
import { RouterModule } from "@angular/router";
import { MdComponentsModule } from "../md-components.module";
import { MobileNavComponent } from "./header/mobile-nav/mobile-nav.component";
import { LoginModalComponent } from "./header/login-modal/login-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const components = [
  CarouselComponent,
  CarouselItemDirective,
  CarouselItemElement,
  FooterComponent,
  HeaderComponent,
  ProductCardComponent,
  MobileNavComponent,
  LoginModalComponent
];

@NgModule({
  declarations: [
    ...components,
    DollarsPipe,
    InventoryPipe,
    CarouselItemDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...components, DollarsPipe, InventoryPipe, CarouselItemDirective]
})
export class SharedModule {}
