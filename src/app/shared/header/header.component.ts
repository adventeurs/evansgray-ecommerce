import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
        public auth: AuthService,
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


    toggleImg(){
      this.clearImg = !this.clearImg;
    }

}
