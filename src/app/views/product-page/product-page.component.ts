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
    private cartService: CartService,
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
                  this.inventory = this.createInventoryArray(info[0].inventory);
                })
          })
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  createInventoryArray( inventory ): Number[]{
    let inventoryArray: Number[]= [];

    for(let i = 1; i < inventory + 1; i++){
      inventoryArray.push(i)
    }
    return inventoryArray
  }

  addToCart( product , _amount ){
    let amount = parseInt(_amount)
    this.cartService.addToCart( product , amount )
    this.notification.snackbarProduct(product)
  }

}
