import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product$;
  subscription: any;
  inventory: any;
  quantity: number = 1;
  
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: ActivatedRoute,
    private notification: NotificationService
  ) { 

  }

  ngOnInit() {
    this.router.paramMap
        .subscribe( param => {
            this.subscription = this.productService.getProductBySku(param.get('sku'))
                .valueChanges()
                .subscribe( info => {
                  this.product$ = info[0];
                  this.inventory = this.cart.createInventoryArray(info[0].inventory);
                })
          })
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  addToCart( product , _amount ){
    let amount = parseInt(_amount)
    this.cart.addToCart( product , amount )
    this.notification.snackbarProduct(product)
  }

  removeCartItem( product ){
    this.cart.removeCartItem( product )
  }

}
