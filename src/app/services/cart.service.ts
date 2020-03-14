import { Injectable} from '@angular/core';
import { Product } from '../models/product';
import { Observable,ReplaySubject, of} from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import {  map,  switchMap, mapTo, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartRef: AngularFirestoreDocument;
  public cartTotal = new ReplaySubject<Number>(1);
  public cartSize = new ReplaySubject<Number>(1);
  public cart = new ReplaySubject<Product[]>(1);


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
                                      tap( ( cart: Product[]) =>{
                                        let convertedCart = this.convertCart(cart);
                                        this.cart.next(convertedCart)
                                      }),
                                      tap( cart => {
                                        let totals = this.sumQuantity(cart);
                                        let total = this.reducer(totals);
                                        this.cartSize.next(total)
                                      }),
                                      tap( cart => {
                                        let totals = this.sumPrices(cart);
                                        let total = this.reducer(totals);
                                        this.cartTotal.next(total)
                                      })
                                    );
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

  filterResults( filters: string[] , results: Product[] ){
    const newResults = [];

    for( let i = 0; i < results.length; i++){
      if( filters.filter( term => results[i].categories.includes(term)) ){
        newResults.push( results[i] )
      } 
    }

    return newResults;
  }

  // Calculation methods 

  private sumPrices( product ){
    return Object.keys(product).map( key => product[key].price * product[key].quantity );
  }

  private sumQuantity( product ){
    return Object.keys(product).map( key => product[key].quantity );
  }

  private reducer( totals ){
    return totals.reduce( ( a , b) => a + b, 0);
  }

  private convertCart( obj ): Product[]{
    let keys = Object.keys(obj);
    let newObj = [];

    for( let prop of keys){
      newObj.push(obj[prop])
    }

    return newObj
  }
  
  }
  

