import { Component } from "@angular/core";
import { transition, trigger, style, animate } from "@angular/animations";
import { slide } from "src/app/common/animations/animations";

@Component({
  selector: "ribbon",
  template: `
    <div class="feature">
      <div class="feature-img">
        <img src="../../../assets/ribbon-texture-mix.jpg" />
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
