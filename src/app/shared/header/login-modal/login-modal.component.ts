import { Component, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModalService } from 'src/app/services/login-modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent{
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
    name: new FormControl( '', [
      Validators.required
    ])
  });
  @Input() toggleModal: boolean;
  toggleLoginForm: boolean = false;

  constructor( 
          public auth: AuthService,
          public modal: LoginModalService
          ) { 
    }
  
    closeModal(){
      this.modal.toggleModal.emit(false)
    }

    emailRegister(){
      this.auth.emailSignUp( this.form.value.email, this.form.value.password, this.form.value.name );
    }

    emailLogin(){
      this.auth.emailLogin( this.form.value.email, this.form.value.password );
    }

    loginForm(){
      this.toggleLoginForm = !this.toggleLoginForm;
    }

    hasError( controlName: string, errorName: string ){
      return this.form.controls[controlName].hasError(errorName);
    }
}
