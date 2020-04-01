import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  // SHOP BY CATEGORY
  // FILTER SEARCH RESULTS
  productListing;
  products: Product[] ;
  productSubscription: Subscription;
  filter;
  loading = true;

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      ) { 
       }

  ngOnInit() {
  this.productSubscription =                                                         
    this.productService.getProducts()
          .pipe(
            switchMap( ( products : Product[] ) => {
              this.products = products;
              this.loading = false;
              return this.route.queryParamMap
            }))
            .subscribe( params => {
              this.filter = params.getAll('filter').toString()
              console.log(this.products)
              this.productListing = this.filter 
                  ? this.products.filter( products =>
                      this.productService.filter( products, this.filter.split(',') )) 
                  : this.products
            });

    }

  ngOnDestroy(){
    this.productSubscription.unsubscribe()
  }


}
