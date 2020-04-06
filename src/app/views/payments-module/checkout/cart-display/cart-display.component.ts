import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ShippingInfoComponent } from 'src/app/shared/shipping-info/shipping-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  displayCart: Observable<Product[]>;
  cartTotal: Observable<Number>;
  show: boolean = false;
  quantity;

  constructor(
    private cart: CartService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { 
  }

  ngOnInit() {
   this.cartTotal = this.cart.total
   this.displayCart = this.cart.cartArray

  }

  removeFromCart( product ){
    this.cart.removeCartItem( product )
  }

  addToCart( product, _quantity){
    let quantity = parseInt(_quantity)
    this.cart.addToCart( product, quantity)
     
  }

  openDialog(){
      this.dialog.open(ShippingInfoComponent)
    }


}
