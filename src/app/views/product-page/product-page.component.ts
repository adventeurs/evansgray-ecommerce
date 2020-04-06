import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from 'src/app/models/product';
import { Subscription, Observable, of } from 'rxjs';
import { DocumentData, DocumentSnapshot } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, flatMap, tap, map, filter, pluck, mergeMap, toArray } from 'rxjs/operators';
import { firestore } from 'firebase';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  cart$;
  product$;
  // inventory: Number[];
  quantity: number = 1;
  
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: ActivatedRoute,
    private notification: NotificationService,
    private auth: AuthService
  ) { 
  }

  ngOnInit() {
      this.product$ = this.router.paramMap.pipe(
          switchMap( ( param: ParamMap ) => this.getProductBySku(param.get('sku'))),
          switchMap( ( doc: firestore.DocumentSnapshot ) => of(doc.data()) )
          )

      this.cart$ = this.cart.cartArray.pipe(
                        map( cart => cart.map( product => product.sku))
                      )

  }


  getProductBySku( sku ): Observable<any>{
    return this.productService.getProductBySku( sku )
  }

  addToCart( product , _amount){
    console.log(product)
    let amount = parseInt(_amount)
    this.cart.addToCart( product , amount )
    this.notification.snackbarProduct(product)

  }

  removeCartItem( product ){
    this.cart.removeCartItem( product )

  }

}
