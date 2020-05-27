import { Component } from "@angular/core";

@Component({
  selector: "hero",
  template: `
    <div class="hero">
      <div class="cta">
        <h1 class="thoughtful">
          Thoughtful
        </h1>
        <h1>
          Handmade
        </h1>
        <h3>Heirloom-quality textiles for the maker in you</h3>
        <button class="green-btn">
          Shop
        </button>
      </div>
      <div class="hero-img">
        <div class="hero-image-wrapper">
          <img
            src="../../../assets/apron_pattern_blush_ribbon_textured_ivory_back_emily.jpg"
            alt=""
          />
        </div>
        <div class="watercolor-10"></div>
        <div class="watercolor-18"></div>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class HeroHomeComponent {}
