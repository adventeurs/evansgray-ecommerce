import { Component } from "@angular/core";

@Component({
  selector: "natural-color",
  template: `
    <div class="natural-color">
      <div class="natural-color-pink">
        <img src="../../../assets/ribbon-pink-group.png" alt="" />
      </div>
      <span class="vertical-divider"></span>
      <div class="natural-color-cta">
        <h2>Radiant, Natural Color</h2>
        <p>
          By combining high quality natural fiber with time-honored natural dye
          techniques, Evansgray creates textiles you will cherish for years to
          come. Naturally dyed colors possess a remarkable depth that simply
          cannot be replicated by synthetic dyes. The specific hue for every
          batch is developed, layer by layer, over multiple days in order to
          create truly special color for every collection.
        </p>
        <button class="green-btn">Shop</button>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class NaturalColorComponent {}
