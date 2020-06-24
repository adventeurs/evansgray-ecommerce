import { Component } from "@angular/core";

@Component({
  selector: "cat-home",
  template: `
    <div class="selection">
      <h2>Categories</h2>
      <div class="category-container">
        <div
          class="category"
          [routerLink]="['/shop']"
          [queryParams]="{ filter: 'table-runners,napkins' }"
          style="background-position-x: -172px;"
          [style.background-image]="
            'url(assets/products/napkin_copper_plate_setting_1.jpg)'
          "
        >
          <h4>For Home</h4>
          <div class="white-cover"></div>
        </div>
        <div
          class="category"
          [routerLink]="['/shop']"
          [queryParams]="{ filter: 'ribbon' }"
          style="background-position-x: -35px;"
          [style.background-image]="
            'url(assets/products/ribbon_classic_seaside_10.jpg)'
          "
        >
          <h4>Ribbon</h4>
          <div class="white-cover"></div>
        </div>
        <div
          class="category"
          [routerLink]="['/shop']"
          [queryParams]="{ filter: 'aprons' }"
          style="background-position-x: -50px;"
          [style.background-image]="
            'url(assets/products/apron_mustard_front_1.jpg)'
          "
        >
          <h4>For Body</h4>
          <div class="white-cover"></div>
        </div>
        <div
          class="category"
          [routerLink]="['/shop']"
          [queryParams]="{ filter: 'notions' }"
          style="background-position-x: -159px;"
          [style.background-image]="
            'url(assets/products/pincushion_bliss_no5_1.jpg)'
          "
        >
          <h4>Notions</h4>
          <div class="white-cover"></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class CatHomeComponent {}
