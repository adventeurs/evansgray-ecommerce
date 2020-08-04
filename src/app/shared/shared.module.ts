import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarouselComponent } from "./carousel/carousel.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";
import { DollarsPipe } from "./pipes/dollars.pipe";
import { InventoryPipe } from "./pipes/inventory.pipe";
import { ProductCardComponent } from "./product-card/product-card.component";
import { CarouselItemDirective } from "./carousel-item.directive";

const components = [
  CarouselComponent,
  FooterComponent,
  HeaderComponent,
  ProductCardComponent
];

@NgModule({
  declarations: [
    ...components,
    DollarsPipe,
    InventoryPipe,
    CarouselItemDirective
  ],
  imports: [CommonModule],
  exports: [...components, DollarsPipe, InventoryPipe, CarouselItemDirective]
})
export class SharedModule {}
