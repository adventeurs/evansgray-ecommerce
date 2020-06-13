import { Component } from "@angular/core";

@Component({
  selector: "for-body",
  template: `
    <div class="feature slideIn">
      <div class="feature-img">
        <div
          class="feature-img-bck"
          [style.background-image]="
            'url(assets/products/scrunchies_mix_hands_highfive_apron_pink_cloud.jpg)'
          "
        ></div>
      </div>
      <div class="feature-cta">
        <h2>For Body</h2>
        <p>
          Our specialty wearables are the perfect balance between function and
          beauty. Driven by curiosity, grounded by observation, and fulfilled by
          creating, nurture the maker in you by filling your life with
          meaningful handmade goods.
        </p>
      </div>
    </div>
  `,
  styleUrls: ["../shop.component.scss"]
})
export class ForBodyComponent {}
