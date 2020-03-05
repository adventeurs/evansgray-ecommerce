import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  displayCart: Product[];
  cartTotal;

  constructor(
    private cart: CartService
  ) { 
  }

  ngOnInit() {
   this.cartTotal = this.cart.total
  }

  // cartTotals( products: Product[]): number {
  //   this.cartTotal = 0;

  //   for( let i = 0; i < products.length; i++ ){
  //     this.cartTotal += JSON.parse(products[i]['amount'])
  //   }

  //   return this.cartTotal;
  // }
}
