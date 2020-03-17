import { Component, Input } from '@angular/core';
import { LoginModalService } from 'src/app/services/login-modal.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evansgray';
  @Input() toggleModal: boolean;
  user;

  constructor(
    public _router: Router,
    public auth: AuthService
  ){
    this.user = this.auth.user$
  }
}
