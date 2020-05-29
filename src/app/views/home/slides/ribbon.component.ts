import { Component } from "@angular/core";

@Component({
  selector: "ribbon",
  template: `
    <div class="slide">
      <div class="slide-img">
        <div class="slide-image-wrapper square-slide">
          <div class="ribbon"></div>
        </div>
        <div class="watercolor-ribbon-2"></div>
      </div>
      <div class="slide-cta square-cta">
        <h2>Classic Silk Ribbon</h2>
        <p>
          Developed with florists in mind, Evansgray Classic Silk Ribbon is the
          ultimate ribbon for both beauty and function. This luminous Habotai
          silk is cut on the bias, providing a slight stretch for smooth ribbon
          wraps without fraying.
        </p>
        <button class="light-blue-btn">Shop</button>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class RibbonComponent {}
