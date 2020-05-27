import { Component, OnInit } from "@angular/core";

@Component({
  selector: "scrunchie",
  template: `
    <div class="slide">
      <div class="slide-img">
        <div class="slide-image-wrapper">
          <img
            src="../../../assets/products/schrunchies_buns_gold_blush_detail_2.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="slide-cta">
        <h2>The Scrap Scrunch</h2>
        <p>
          You’ll be rocking one on your wrist and one in your hair at all times,
          trust me. Scrap Scrcunchies are recycled from the ribbon dyeing
          process, using experimental colors or imperfect pieces. If you want a
          little more flair - pair with Classic Silk Ribbon to create fun,
          floppy bow scrunchies.
        </p>
        <button class="light-blue-btn">Shop</button>
      </div>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class ScrunchieComponent implements OnInit {
  ngOnInit() {
    console.log("hello");
  }
}
