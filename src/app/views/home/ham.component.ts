import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ham",
  template: `
    <div class="ham">
      <h1>HERE I AM</h1>
      <h5>I am here too</h5>
    </div>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HamComponent implements OnInit {
  ngOnInit() {
    console.log("hello");
  }
}
