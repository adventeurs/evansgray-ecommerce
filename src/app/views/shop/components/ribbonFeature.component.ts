import { Component } from "@angular/core";

@Component({
  selector: "ribbon",
  template: `
    <div class="feature slideIn">
      <div class="feature-img">
        <div
          class="feature-img-bck"
          [style.background-image]="'url(assets/ribbon_textured_mix.jpg)'"
        ></div>
      </div>
      <div class="feature-cta">
        <h2>Ribbon</h2>
        <p>
          Richly colored, silk ribbons hand dyed in small batches. Designed with
          florists in mind, our ribbons are the perfect complement to any
          bouquet. Layer pops of color, neutral tones, or monochomatic hues to
          craft an elegant look that is all your own.
        </p>
      </div>
    </div>
  `,
  styleUrls: ["../shop.component.scss"]
})
export class RibbonFeatureComponent {}
