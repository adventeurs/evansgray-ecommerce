import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { of, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  filter: string;
  loading: boolean = true;
  product$: Observable<Product[]>;

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      ) { 
       }

  ngOnInit() {
   this.product$ = combineLatest( 
                      this.route.queryParamMap,
                      this.productService.getProducts()
                    ).pipe(
                      switchMap( ([ params, products ]: [ ParamMap, Product[] ]) => {
                        this.filter = params.getAll('filter').toString();

                        let filteredProducts = this.filter 
                                              ? this.filterProducts(products) 
                                              : products
                        this.loading = false;
                        
                        return of(filteredProducts)
                      })
                    )
    }

  filterProducts( products ): Product[]{
    return products.filter( products =>
      this.productService.filter( products, this.filter.split(',') )) 
  }

}
