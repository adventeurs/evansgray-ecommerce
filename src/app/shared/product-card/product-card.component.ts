import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/models/product";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent {
  @Input() product: Product;
}
