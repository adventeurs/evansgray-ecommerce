import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products$;
 
  constructor(
      private productService: ProductService,
      private cartService: CartService
      ) { 
     this.products$ = this.productService.getAllProducts().valueChanges();

    }

  ngOnInit() {
    
  }

  
}
