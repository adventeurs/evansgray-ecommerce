import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { CartProduct } from '../models/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  storage = localStorage.getItem( 'products' ) 
                    ? JSON.parse( localStorage.getItem( 'products' ))
                    : [];
  cart : Product[];
  cartProduct: CartProduct;
   
  constructor() { 
  }

  addProductToCart(product: Product, total: number){
    const{ amount, parent, type, title } = product
    const cartProduct = { amount, parent, type, title }
    
    for(let i = 0; i < total; i++){
    this.storage.push(cartProduct);

    localStorage.setItem(
        'products',
        JSON.stringify(this.storage)
      );
    }
  }

  getProductsFromCart(){
    return JSON.parse(localStorage.getItem('products'));

  }

  removeAllProductsFromCart(){
    this.storage = [];
    localStorage.clear;

  }

  removeProductFromCart(product: Product){
    let storage = JSON.parse( localStorage.getItem( 'products' ));

    let removed = storage.filter( product.sku != product.sku );
    
    let updated = JSON.stringify( removed );
    localStorage.setItem( 'products', updated )

    }

    // Update cart count

  }
  

