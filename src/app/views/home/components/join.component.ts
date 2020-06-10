import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "join",
  template: `
    <div class="join">
      <img class="bouquet" src="../../../assets/Bouquet-16.png" />
      <h2>Join the newsletter</h2>
      <p>10% off your first order</p>
      <form [formGroup]="signUp">
        <input formControlName="email" required id="email" type="text" />
        <img class="watercolor-16" src="../../../assets/watercolor-16.png" />
      </form>
    </div>
  `,
  styleUrls: ["../home.component.scss"]
})
export class JoinComponent {
  signUp = new FormGroup({
    email: new FormControl("", [Validators.email])
  });

  submit() {}
}
