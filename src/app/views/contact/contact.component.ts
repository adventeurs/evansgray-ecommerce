import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent {
  complete: boolean;
  contact = new FormGroup({
    email: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required])
  });

  constructor(private http: HttpClient) {}

  get email() {
    return this.contact.get("email");
  }
  get name() {
    return this.contact.get("name");
  }
  get message() {
    return this.contact.get("message");
  }

  sendContact(value) {
    try {
      this.http
        .post("/api/email/contact", value)
        .toPromise()
        .then(res => {
          this.complete = true;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
