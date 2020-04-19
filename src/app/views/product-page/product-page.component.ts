import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap,  map, tap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  cart$;
  product$;
  quantity: number = 1;
  hovered;
  
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
                        map( cart => cart.map( product => product.sku)),
                      )

  }


  getProductBySku( sku ): Observable<any>{
    return this.productService.getProductBySku( sku )
  }

  addToCart( product , _amount){
    let amount = parseInt(_amount)
    this.cart.addToCart( product , amount )
    this.notification.snackbarProduct(product)

  }

  removeCartItem( product ){
    this.cart.removeCartItem( product )

  }

  skuIncluded(sku, product){
    if(sku)
      return sku.includes(product)
    else true
  }

}
