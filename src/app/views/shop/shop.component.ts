import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Subscription, Observable } from 'rxjs';
import { DocumentData } from 'angularfire2/firestore';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // SHOP BY CATEGORY
  // FILTER SEARCH RESULTS
  productListing$;
  productSubscription: Subscription;
  filterResults: Product[] = [];
 
  constructor(
      private productService: ProductService,
      private cartService: CartService
      ) { 
    }

  ngOnInit() {
    this.productSubscription = this.productService.getAllProducts().valueChanges()
                                   .subscribe( products => {
                                    //  this.productListing$ = filteredSearch(filterResults, products)
                                    this.productListing$ = products
                                    console.log(products)
                                   })
  }

  
}
