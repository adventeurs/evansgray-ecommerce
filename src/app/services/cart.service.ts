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

  // Retrieve The Total Price of Cart
  get total(){
    return this.cartTotal;
  }

  // Retrieve The Total Number Of Items In The Cart
  get size(){
    return this.cartSize;
  }

  // Retrieve Cart As An Iterable Array
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
        //  If User Is Logged In
        if ( user ){
          // Reference To Firestore Cart
          this.cartRef = db.doc<Product>(`carts/${user.uid}`);
          // Return Users Cart And Perform Details Logic
          return this.cartRef.valueChanges()
                      .pipe(
                        tap( cart => this.nextSize(cart) ),
                        tap( cart => this.cart.next( [...Object.values(cart)] ) ),
                        tap( cart => this.nextTotal(cart) )
                        )
        } else {
          this.cartSize.next(0)
          return of(null)
        }
       })).subscribe()
       
  }

  // Take Inventory Amount And Create Array To Display
  createInventoryArray( inventory ): Number[]{
    let inventoryArray: Number[]= [];

    for(let i = 1; i < inventory + 1; i++){
      inventoryArray.push(i);
    }
    return inventoryArray;
  }

  // Add Product To Cart With Only Essential Information
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

  // Remove Item From Cart
  async removeCartItem( product ){
    this.cartRef.update({
      [product.sku] : firestore.FieldValue.delete()
    });

  }
  

  // Calculation methods 

  private sumQuantity( product ){
    if(product)
    return Object.keys(product).map( key => product[key].quantity );
  }

  private reduce( totals ){
    if(totals)
    return totals.reduce( ( a , b) => a + b, 0);
  }

  // Find Total Price Of Items In Cart
  private nextTotal( product ){
    if(product){
    let totals =  Object.keys(product).map( key => product[key].price * product[key].quantity );
    let finalTotal = totals.reduce( ( a , b) => a + b, 0);

    this.cartTotal.next(finalTotal)
    }
  }
  
  // Find Total Quantity Of Items In Cart
  private nextSize( cart ){
    if(cart){
    let items = this.sumQuantity(cart);
    let quantity = this.reduce(items);

    this.cartSize.next(quantity)
    }
  }
  }
  

