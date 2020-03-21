import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleModal: boolean = false;
  size;
  clearImg: boolean = false;
  
  constructor( 
        private auth: AuthService,
        private cartService: CartService,
        public router: Router,
        private fireAuth: AngularFireAuth
        ) { 
      }

  ngOnInit() { 
    this.size = this.cartService.size
  }

   
    firstName( displayName: string ) : string{
      let name = displayName.split(' ')
      return name.length > 0 ? name[0] : displayName;
    }

    openModal(){
      this.toggleModal = !this.toggleModal
    }

    close(){
      this.toggleModal = !this.toggleModal
    }

    toggleImg(){
      this.clearImg = !this.clearImg;
    }

    recieveToggle( e ){
      this.toggleModal = e
    }

}
