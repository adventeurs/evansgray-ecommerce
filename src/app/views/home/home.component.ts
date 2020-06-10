import { Component } from "@angular/core";
import { ApronComponent } from "./slides/apron.component";
import { CartService } from "src/app/services/cart.service";
import { RibbonComponent } from "./slides/ribbon.component";
import { ScrunchieComponent } from "./slides/scrunchie.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  slides = [
    { component: ApronComponent },
    { component: RibbonComponent },
    { component: ScrunchieComponent }
  ];

  constructor(private cart: CartService) {}
}
