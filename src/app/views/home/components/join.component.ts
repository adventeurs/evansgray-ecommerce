import { Component } from "@angular/core";

@Component({
  selector: "join",
  template: `
    <div class="sign-up">
      <form action="">
        <div class="input">
          <input class="email-input" type="email" />
          <h4>Want 10% off?</h4>
          <p>Sign-up for updates and a discount on your first order</p>
        </div>
        <button class="white-btn">Get discount</button>
      </form>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class JoinComponent {}
