import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModalService } from 'src/app/services/login-modal.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() toggleLoginFrom: boolean;
  storage: any;
  toggleModal: boolean;
  clearImg: boolean = false;
  
  constructor( 
        private auth: AuthService,
        public modal: LoginModalService,
        private cartService: CartService,
        public router: Router
        ) { 
        this.storage = this.cartService.storage
      }

  ngOnInit() {
    this.modal.toggleModal.subscribe( bool => this.toggleModal = bool )
    // setTimeout( function(){ console.log(this.auth.isLoggedIn()) }, 1000)
  }

   
    firstName( displayName: string ) : string{
      let name = displayName.split(' ')
      return name.length > 0 ? name[0] : displayName;
    }

    openModal(){
      this.modal.toggleModal.emit(true)
    }

    close(){
      this.modal.toggleModal.emit(false)
    }

    toggleImg(){
      this.clearImg = !this.clearImg;
    }

}
