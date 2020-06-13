import { Component } from "@angular/core";

@Component({
  selector: "shop-all",
  template: `
    <div class="feature slideIn">
      <div class="feature-img">
        <div
          class="feature-img-bck"
          [style.background-image]="'url(assets/_DSC3356.jpg)'"
        ></div>
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
