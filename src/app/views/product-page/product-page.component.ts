import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { DocumentData } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  productSubscription: Subscription;
  product$: DocumentData;
  inventory: Number[];
  sku: string;
  quantity: number = 1;
  inCart: boolean = false;
  remove: boolean = true;
  
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: ActivatedRoute,
    private notification: NotificationService,
    private auth: AuthService
  ) { 
  }

  async ngOnInit() {
    this.productSubscription = this.router.paramMap
        .subscribe( param => {
            this.product$ = this.productService.getProductBySku(param.get('sku'))
                                .valueChanges().pipe(
                                  tap( product =>{
                                    this.inventory = this.cart.createInventoryArray(product[0].inventory )
                                    this.sku = product[0].sku
                                  }));
        });

    this.cartSubscription = 
          this.cart.cartArray.subscribe( (cart: Product[]) =>
            cart.filter( product => {
              if(product){
              if(product.sku === this.sku)
                this.inCart = true
              }
            }));

    this.product$.subscribe( val => console.log(val))
  }


  ngOnDestroy(){
    this.productSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  addToCart( product , _amount){
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
