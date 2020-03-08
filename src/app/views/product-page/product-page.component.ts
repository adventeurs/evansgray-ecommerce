import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { DocumentData } from 'angularfire2/firestore';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  subscription: Subscription;
  product$: DocumentData;
  inventory: Number[];
  quantity: number = 1;
  inCart: boolean = false;
  remove: boolean = false;
  
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
                });
          });
    this.cartSubscription = 
          this.cart.displayCart.subscribe( (cart: Product[]) =>
            cart.filter( product => {
              if(product){
              if(product.sku === this.product$.sku)
                this.inCart = true
              }
            }));
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  addToCart( product , _amount ){
    let amount = parseInt(_amount)
    this.cart.addToCart( product , amount )
    this.notification.snackbarProduct(product)
    if(!this.inCart)
      this.remove = !this.remove
  }

  removeCartItem( product ){
    this.cart.removeCartItem( product )
    this.remove = !this.remove
    this.inCart = !this.inCart
  }

}
