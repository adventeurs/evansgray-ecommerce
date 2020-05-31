import { Component } from "@angular/core";

@Component({
  selector: "for-home",
  template: `
    <div class="feature">
      <div class="feature-img">
        <img src="../../../assets/_DSC3409.png" />
      </div>
      <div class="feature-cta">
        <h2>For Home</h2>
        <p>
          Our home collection unites your decor with the warmth and solemnity
          achieved only by natural dye. Whether you are setting a table for two
          or inviting over the whole family, enrich your memories with
          thoughtful home accents.
        </p>
      </div>
    </div>
  `,
  styleUrls: ["../shop.component.scss"]
})
export class ForHomeComponent {}
