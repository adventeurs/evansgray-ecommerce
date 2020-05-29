import { Component } from "@angular/core";

@Component({
  selector: "bespoke",
  template: `
    <div class="bespoke">
      <div class="bespoke-image">
        <div class="bespoke-image-wrapper">
          <img src="../../../assets/bespoke-image.jpg" alt="" />
        </div>
      </div>
      <div class="bespoke-cta">
        <h2>Bespoke Projects</h2>
        <p>
          Are you interested in custom quilts, wedding accents, or wall
          hangings? Let’s work together to bring your dream to life!
        </p>
        <button class="light-blue-btn">Shop</button>
      </div>
    </div>
    <img class="wc1" src="../../../assets/watercolor-1.png" />
    <img class="wc3" src="../../../assets/3.png" />
  `,
  styleUrls: ["../home.component.scss"]
})
export class BespokeComponent {}
