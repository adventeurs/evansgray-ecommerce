import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { ReplaySubject, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData
} from "@angular/fire/firestore";
import { switchMap, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { firestore, User } from "firebase/app";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private cartRef: AngularFirestoreDocument;
  private userRef: AngularFirestoreDocument;
  private cartTotal = new ReplaySubject<Number>(1);
  private cartSize = new ReplaySubject<Number>(1);
  private cart = new ReplaySubject<Product[]>(1);

  // Retrieve The Total Price of Cart
  get total(): ReplaySubject<Number> {
    return this.cartTotal;
  }

  // Retrieve The Total Number Of Items In The Cart
  get size(): ReplaySubject<Number> {
    return this.cartSize;
  }

  // Retrieve Cart As An Iterable Array
  get cartArray(): ReplaySubject<Product[]> {
    return this.cart;
  }

  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private notification: NotificationService
  ) {
    this.fireAuth.authState
      .pipe(
        switchMap(user => {
          //  If User Is Logged In
          if (user) {
            // Reference To Firestore Cart
            this.userRef = db.doc<User>(`users/${user.uid}`);
            this.cartRef = db.doc<Product>(`carts/${user.uid}`);
            // Return Users Cart And Perform Details Logic
            return this.cartRef.valueChanges().pipe(
              tap(cart => this.nextSize(cart)),
              tap(cart => this.toCartArray(cart)),
              tap(cart => this.nextTotal(cart))
            );
          } else {
            this.cartSize.next(0);
            return of(null);
          }
        })
      )
      .subscribe();
  }

  abandonedCart() {
    const data = {
      abandonedCart: new Date()
    };
    try {
      this.userRef.update(data);
      this.cartRef.update(data);
    } catch (e) {
      console.log(e);
    }
  }

  // Add Product To Cart With Only Essential Information
  addToCart(product: Product, quantity: number) {
    let productToAdd = {
      [product.sku]: {
        main: product.main,
        sku: product.sku,
        title: product.title,
        type: product.type,
        quantity: quantity,
        parent: product.parent,
        price: product.price,
        inventory: product.inventory
      }
    };

    this.cartRef.set(productToAdd, { merge: true }).catch(err => {
      this.notification.snackbarAlert(err);
    });
  }

  // Remove Item From Cart
  async removeCartItem(product) {
    this.cartRef.update({
      [product.sku]: firestore.FieldValue.delete()
    });
  }

  async deleteCart() {
    this.cartRef.delete();
    this.cartArray.next([]);
    this.cartSize.next(0);
    this.cartTotal.next(0);
  }

  // Calculation methods

  private sumQuantity(product) {
    if (product) return Object.keys(product).map(key => product[key].quantity);
  }

  private reduce(totals) {
    if (totals) return totals.reduce((a, b) => a + b, 0);
  }

  // Find Total Price Of Items In Cart
  private nextTotal(product) {
    if (product) {
      let totals = Object.keys(product).map(
        key => product[key].price * product[key].quantity
      );
      let finalTotal = totals.reduce((a, b) => a + b, 0);

      this.cartTotal.next(finalTotal);
    }
    return 0;
  }

  // Find Total Quantity Of Items In Cart
  private nextSize(cart) {
    if (cart) {
      let items = this.sumQuantity(cart);
      let quantity = this.reduce(items);

      this.cartSize.next(quantity);
    }

    return 0;
  }

  private toCartArray(cart: DocumentData) {
    if (cart) return this.cart.next([...Object.values(cart)]);
    else return [];
  }
}
