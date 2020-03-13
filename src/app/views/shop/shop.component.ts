import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Subscription, Observable, BehaviorSubject, from } from 'rxjs';
import { filter, map, switchMap} from 'rxjs/operators';
import { RouteConfigLoadEnd, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // SHOP BY CATEGORY
  // FILTER SEARCH RESULTS
  productListing;
  products;
  productSubscription: Subscription;
  filter;
  filter$ = ['blue', 'gold']
  constructor(
      private productService: ProductService,
      private cartService: CartService,
      private route: ActivatedRoute,
      private _router: Router
      ) { 
       }

  ngOnInit() {                                                         
  this.productService.getAllProducts()
        .pipe(
          switchMap( products => {
            this.products = products;
            return this.route.queryParamMap
          }))
          .subscribe( params => {
            this.filter = params.getAll('filter').toString()

            this.productListing = this.filter ?
                this.products.filter( products => this.productService.filter( products, this.filter.split(',') ) ) :
                this.products
          })
  }

  event( e,  _filter ){
    let currentParams = Object.assign({}, this.route.snapshot.queryParams);
    let params: string [] = currentParams.filter ? currentParams.filter.split(',') : [];

    if( e.checked )
      params.push(_filter);
    else {
      params = params.filter( value => _filter != value);
        if(params.length == 0 ){
          console.log('hi')
          this._router.navigate([], {replaceUrl: true})
          }
    }

    this.setQueryParams( params.toString() )

  }


  setQueryParams( params ){
    this._router.navigate( [] , {
      queryParams: {
        filter: params
      },
      queryParamsHandling: 'merge'
    })
  }
}
