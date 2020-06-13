import { Component } from "@angular/core";

@Component({
  selector: "for-home",
  template: `
    <div class="feature slideIn">
      <div class="feature-img">
        <div
          class="feature-img-bck"
          style="background-size: 109%;"
          [style.background-image]="'url(assets/table.png)'"
        ></div>
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
