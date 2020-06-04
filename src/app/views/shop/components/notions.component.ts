import { Component } from "@angular/core";

@Component({
  selector: "notions",
  template: `
    <div class="feature slideIn">
      <div class="feature-img">
        <img src="../../../assets/pincushion4_4.jpg" />
      </div>
      <div class="feature-cta">
        <h2>Notions</h2>
        <p>
          Its all in the details. Our sewing notions bring a calming presence to
          your craft, whether you’re an avid seamstress or simply mending a few
          tears.
        </p>
      </div>
    </div>
  `,
  styleUrls: ["../shop.component.scss"]
})
export class NotionsComponent {}
