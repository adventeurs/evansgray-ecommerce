import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  displayCart: Observable<String[]>;
  cartTotal: Observable<Number>;
  show: boolean = false;
  quantity;
  inventory:  Number[] = [];

  constructor(
    private cart: CartService,
    private auth: AuthService
  ) { 
  }

  ngOnInit() {
   this.cartTotal = this.cart.total
   this.displayCart = this.cart.displayCart
  }

  removeFromCart( product ){
    this.cart.removeCartItem( product )
  }

  display( inventory, event: Event){
    event.preventDefault();
    this.inventory = this.cart.createInventoryArray(inventory)
    this.show = !this.show
  }

  addToCart( product, _quantity){
    let quantity = parseInt(_quantity)
    this.cart.addToCart( product, quantity)
    this.show = !this.show
  }
}
