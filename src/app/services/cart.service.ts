import { Injectable} from '@angular/core';
import { Product } from '../models/product';
import { ReplaySubject, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import {  switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartRef: AngularFirestoreDocument;
  private cartTotal = new ReplaySubject<Number>(1);
  private cartSize = new ReplaySubject<Number>(1);
  private cart = new ReplaySubject<Product[]>(1);

  get total(){
    return this.cartTotal;
  }

  get size(){
    return this.cartSize;
  }

  get cartArray(){
    return this.cart;
  }

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private fireAuth: AngularFireAuth
  ) { 
    this.fireAuth.authState.pipe(
       switchMap( user => {
        if ( user ){
          this.cartRef = db.doc<Product>(`carts/${user.uid}`);
          return this.cartRef.valueChanges()
                      .pipe(
                        tap( cart => this.nextSize(cart) ),
                        tap( cart => this.cart.next( [...Object.values(cart)] ) ),
                        tap( cart => this.nextTotal(cart) )
                        )
        } else {
          this.cartSize.unsubscribe()
          this.cartTotal.unsubscribe()
          this.cart.unsubscribe()
          return of(null)
        }
       })).subscribe()
       
  }


  createInventoryArray( inventory ): Number[]{
    let inventoryArray: Number[]= [];

    for(let i = 1; i < inventory + 1; i++){
      inventoryArray.push(i);
    }
    return inventoryArray;
  }

  addToCart( product: Product, quantity: number){
    let productToAdd = {
      [product.sku] : {
        main: product.main,
        sku: product.sku,
        title: product.title,
        type: product.type,
        quantity: quantity,
        parent: product.parent,
        price: product.price,
        inventory: product.inventory
      }
    }

    this.cartRef.set( productToAdd, { merge: true } )
      .catch( err => {
      console.log(err);
    });
  }

  async removeCartItem( product ){
    //  find sku and remove
    this.cartRef.update({
      [product.sku] : firestore.FieldValue.delete()
    });

  }
  

  // Calculation methods 

  private sumPrices( product ){
    return Object.keys(product).map( key => product[key].price * product[key].quantity );
  }

  private sumQuantity( product ){
    return Object.keys(product).map( key => product[key].quantity );
  }

  private reduce( totals ){
    return totals.reduce( ( a , b) => a + b, 0);
  }

  private nextTotal( product ){
    let totals =  Object.keys(product).map( key => product[key].price * product[key].quantity );
    let finalTotal = totals.reduce( ( a , b) => a + b, 0);

    this.cartTotal.next(finalTotal)
  }
  
  private nextSize( cart ){
    let items = this.sumQuantity(cart);
    let quantity = this.reduce(items);

    this.cartSize.next(quantity)
  }
  }
  

