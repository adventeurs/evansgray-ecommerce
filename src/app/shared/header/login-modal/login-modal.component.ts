import { Component, Output, Input, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { passwordValidation } from "../../validators/validator";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"]
})
export class LoginModalComponent {
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Input() toggleModal: boolean;
  toggleLoginForm: boolean;
  signUp = false;

  register = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(7)
    ]),
    confirmPassword: new FormControl("", [passwordValidation]),
    name: new FormControl("", [Validators.required])
  });

  get name() {
    return this.register.get("name");
  }

  get rPassword() {
    return this.register.get("password");
  }

  get rEmail() {
    return this.register.get("email");
  }

  get rConfirm() {
    return this.register.get("confirmPassword");
  }

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(7)
    ])
  });

  get fEmail() {
    return this.form.get("email");
  }

  get fPassword() {
    return this.form.get("password");
  }

  constructor(public auth: AuthService) {}

  closeModal() {
    this.toggleEvent.emit(false);
  }

  async googleSignIn() {
    await this.auth.googleSignin().then(_ => (this.toggleModal = false));
  }

  async emailRegister() {
    await this.auth
      .emailSignUp(
        this.register.value.email,
        this.register.value.password,
        this.register.value.name
      )
      .then(_ => (this.toggleModal = false));
  }

  async emailLogin() {
    await this.auth
      .emailLogin(this.form.value.email, this.form.value.password)
      .then(_ => (this.toggleModal = false));
  }

  loginForm() {
    this.toggleLoginForm = !this.toggleLoginForm;
  }
}
