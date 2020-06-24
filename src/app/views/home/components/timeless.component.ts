import { Component } from "@angular/core";

@Component({
  selector: "timeless",
  template: `
    <div class="natural-color row-reverse">
      <div class="natural-color-pink">
        <img src="../../../assets/wedding-blue.jpg" alt="" />
      </div>
      <span class="vertical-divider"></span>
      <div class="natural-color-cta flex-end">
        <h2>Timeless Design</h2>
        <p class="timeless-p">
          Textiles are with us during our most monumental events and stick along
          for those easily overlooked, but so worthwhile in-between moments.
          Surround yourself with textiles deserving of your story.
        </p>
        <button [routerLink]="['/contact']" class="green-btn">Commision</button>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class TimelessComponent {}
