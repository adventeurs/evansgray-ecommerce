import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>()
  menuOpen: boolean = false;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  openModal(){
    this.toggleEvent.emit(true);
  }
}
