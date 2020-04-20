import { Component, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent {
  menuOpen: boolean = false;

  constructor(
    public auth: AuthService,
    private renderer: Renderer2
  ) { }
  
  toggle(){
    console.log(this.renderer.parentNode(document.body))
    
    if(!this.menuOpen)
      this.renderer.addClass(document.body, 'open')
    
    else
      this.renderer.removeClass(document.body, 'open')

    this.menuOpen = !this.menuOpen
  }

}
