import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Observable, BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { CartProduct } from '../models/cartProduct';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { take, map, pluck, reduce, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartRef: AngularFirestoreDocument;
  private cart$: Observable<firebase.firestore.DocumentData>;
  private cartTotal = new ReplaySubject<Number>(1);
  private cartSize = new ReplaySubject<Number>(1);
  // cartTotal;

  get total(): Observable<Number> {

    this.cart$.pipe( 
      map( product => 
        Object.keys(product).map( key => product[key].price * product[key].quantity ) ),
      map( totals => 
        totals.reduce( ( a , b) => a + b, 0) ))
      .subscribe( val => 
      this.cartTotal.next(val));

    return this.cartTotal.asObservable();
    
  }

  get size(): Observable<Number> {
  
    this.cart$.pipe( 
      map( product => 
        Object.keys(product).map( key => product[key].quantity ) ),
      map( totals => 
        totals.reduce( ( a , b) => a + b, 0) ))
      .subscribe( val => 
      this.cartSize.next(val));

    return this.cartSize.asObservable();
    
  }
  

 
  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private fireAuth: AngularFireAuth
  ) { 
    this.cart$ = fireAuth.authState.pipe(
      switchMap( user => {
        if ( user ){
          this.cartRef = db.doc<Product>(`carts/${user.uid}`);
          return this.cartRef.valueChanges();
        } else {
          return of(null)
        }
      })
    )
    }



  addToCart( product: Product, quantity: number){
    let productToAdd = {
      [product.sku] : {
        sku: product.sku,
        title: product.title,
        type: product.type,
        quantity: quantity,
        parent: product.parent,
        price: product.price
      }
    }

    this.cartRef.set( productToAdd, { merge: true } )
      .catch( err => {
      console.log(err)
    })
  }

  async removeCartItem(){
    //  find sku and remove
  }

  }
  

