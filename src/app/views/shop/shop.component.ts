import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, of, merge, combineLatest, zip, Observable } from 'rxjs';
import { switchMap, withLatestFrom} from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  product$;

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      ) { 
       }

  ngOnInit() {
  // const params = this.route.paramMap
  
  // this.product$ = 
  //       this.productService.getProducts().pipe(
  //                           withLatestFrom(params),
  //                           switchMap( ([ products, params ]: [ Product[], ParamMap ]) => {
  //                             this.filter = params.getAll('filter').toString()

  //                             let filtered = this.filter 
  //                                     ? products.filter( product =>
  //                                         this.productService.filter( product, this.filter.split(',') )) 
  //                                     : products
  //                             this.loading = false;
                              
  //                             return of(filtered)
  //                           })
  //                         )

  // combineLatest( 
  //     this.route.paramMap,
  //     this.productService.getProducts()
  //   ).subscribe( ([params, products]) => console.log('params', params ))

  
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
