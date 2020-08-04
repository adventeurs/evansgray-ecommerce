import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent{
  menuOpen: boolean = false;

  constructor(
    public auth: AuthService
  ) { }
}
