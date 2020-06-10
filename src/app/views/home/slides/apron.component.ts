import { Component } from "@angular/core";

@Component({
  selector: "apron",
  template: `
    <div class="slide">
      <div class="slide-img">
        <div class="slide-image-wrapper">
          <img src="../../../assets/products/apron_blush_front_1.jpg" alt="" />
        </div>
        <div class="watercolor-15"></div>
        <div class="watercolor-17"></div>
      </div>
      <div class="slide-cta">
        <h2>The Everyday Apron</h2>
        <p>
          Handmade, naturally dyed linen aprons connect your craft with the
          lineage of women makers that came before. Best of all, each uniquely
          colored apron is comfortable + functional with big, reinforced
          pockets.
        </p>
        <button
          [routerLink]="['/shop']"
          [queryParams]="{ filter: 'aprons' }"
          class="light-blue-btn"
        >
          Shop
        </button>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class ApronComponent {}
