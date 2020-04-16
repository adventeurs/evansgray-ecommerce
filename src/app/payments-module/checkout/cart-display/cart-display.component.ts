import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ShippingInfoComponent } from 'src/app/shared/shipping-info/shipping-info.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  @Input() close: boolean = false;
  displayCart: Observable<Product[]>;
  cartTotal: Observable<Number>;
  show: boolean = false;
  quantity;
  coupon: string;


  discount = new FormGroup({
    code: new FormControl([ '', ])
  })

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
