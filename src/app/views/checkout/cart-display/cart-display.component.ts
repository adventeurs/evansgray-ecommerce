import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ShippingInfoComponent } from 'src/app/shared/shipping-info/shipping-info.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent {
  @Input() close: boolean = false;
  @Input() displayCart: Product[];
  @Input() cartTotal: Observable<Number>;
  show: boolean = false;
  quantity;
  coupon: string;


  discount = new FormGroup({
    code: new FormControl([ '', ])
  })

  constructor(
    private cart: CartService,
    public auth: AuthService,
    private dialog: MatDialog
  ) { 
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
