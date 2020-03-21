import { Component, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent{
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Input() toggleModal: boolean;
  toggleLoginForm: boolean;

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

  constructor( 
          public auth: AuthService,
          ) { 
    }
  
    closeModal(){
      this.toggleEvent.emit(false)
    }

    async googleSignIn(){
      await this.auth.googleSignin()
                  .then(_ => this.toggleModal = false);

    }

    async emailRegister(){
      await this.auth.emailSignUp( this.form.value.email, this.form.value.password, this.form.value.name )
                  .then(_ => this.toggleModal = false);
      
    }

    async emailLogin(){
      await this.auth.emailLogin( this.form.value.email, this.form.value.password )
                 .then(_ => this.toggleModal = false);
    }

    loginForm(){
      this.toggleLoginForm = !this.toggleLoginForm;
    }

    hasError( controlName: string, errorName: string ){
      return this.form.controls[controlName].hasError(errorName);
    }
}
