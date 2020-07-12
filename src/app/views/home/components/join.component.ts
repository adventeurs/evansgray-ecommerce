import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material";
import { NotificationService } from "src/app/services/notification.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "join",
  template: `
    <div class="join">
      <img class="bouquet" src="../../../assets/Bouquet-16.png" />
      <h2>Join the newsletter</h2>
      <p>10% off your first order</p>
      <form [formGroup]="signUp" (ngSubmit)="submit(signUp.value)">
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

  constructor(
    private auth: AuthService,
    private notification: NotificationService,
    private http: HttpClient
  ) {}

  submit(value) {
    this.auth.emailList(value);
    this.http.post("/api/email/signup", value).subscribe(
      _ => {
        this.signUp.reset();
        this.notification.email();
      },
      error => {
        console.log(error);
      }
    );
  }
}
