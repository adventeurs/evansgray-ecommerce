import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { totalmem } from 'os';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  displayCart: Product[];

  constructor(
    private cart: CartService
  ) { 
    this.displayCart = cart.storage
  }

  ngOnInit() {
  }

  cartTotal( products: Product[]): number {
    let total = 0;

    for( let i = 0; i < products.length; i++ ){
      total += products[i]['price']
    }

    return total;
  }
}
