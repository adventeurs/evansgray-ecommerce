import { Component, OnDestroy } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  state,
  useAnimation
} from "@angular/animations";
import { slide, fadeAnimation } from "src/app/common/animations/animations";

@Component({
  selector: "shop-all",
  template: `
    <div class="feature slideIn">
      <div class="feature-img">
        <img src="../../../assets/_DSC3356.jpg" />
      </div>
      <div class="feature-cta">
        <h2>Shop All</h2>
        <p>
          Evansgray makes naturally dyed, functional textiles to serve the maker
          in everyone. Whether you want to wear, create with, or admire natural
          color, Evansgray’s use of slow processes and natural materials will
          help you fill your life with meaningful, long lasting beauty.
        </p>
      </div>
    </div>
  `,
  styleUrls: ["../shop.component.scss"]
})
export class ShopAllComponent {}
