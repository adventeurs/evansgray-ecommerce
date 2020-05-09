import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product$;
  subscription: any;
  
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.router.paramMap
        .subscribe( param => {
            this.subscription = this.productService.getProductByTitle(param.get('title'))
                .valueChanges()
                .subscribe( info => this.product$ = info[0])
          })
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
