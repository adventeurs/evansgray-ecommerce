import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { of, BehaviorSubject, Observable } from "rxjs";
import { AngularFirestore, DocumentData } from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { firestore } from "firebase/app";
import { NotificationService } from "./notification.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private cartRef$: Observable<any>;

  // Retrieve The Total Price of Cart
  get total(): Observable<number> {
    return this.currentCart.pipe(switchMap(this.nextTotal));
  }

  // Retrieve The Total Number Of Items In The Cart
  get size(): Observable<number> {
    return this.currentCart.pipe(switchMap(this.nextSize));
  }

  // Retrieve Cart As An Iterable Array
  get cartArray(): Observable<Product[]> {
    return this.currentCart.pipe(switchMap(this.toCartArray));
  }

  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private notification: NotificationService,
    private auth: AuthService
  ) {
    this.cartRef$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        //  If User Is Logged In
        if (user) {
          return this.db.doc<Product>(`carts/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  private _currentCart$: BehaviorSubject<Product[]>;
  private get currentCart(): BehaviorSubject<Product[]> {
    if (!this._currentCart$) {
      this._currentCart$ = new BehaviorSubject<Product[]>(undefined);
      this.cartRef$.subscribe(this._currentCart$);
    }

    return this._currentCart$;
  }

  private get cartRef() {
    const uid = this.auth.getCurrentUser().uid;
    return this.db.doc<any>(`carts/${uid}`);
  }

  abandonedCart() {
    const data = {
      abandonedCart: new Date()
    };
    try {
      const uid = this.auth.getCurrentUser().uid;
      this.db.doc(`users/${uid}`).update(data);
    } catch (e) {
      console.log(e);
    }
  }

  // Add Product To Cart With Only Essential Information
  addToCart(product: Product, quantity: number) {
    const productToAdd = {
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

  // Find Total Price Of Items In Cart
  private nextTotal(product): Observable<number> {
    if (product) {
      let totals = Object.keys(product).map(
        key => product[key].price * product[key].quantity
      );
      let finalTotal = totals.reduce((a, b) => a + b, 0);

      of(finalTotal);
    }
    return of(0);
  }

  // Find Total Quantity Of Items In Cart
  private nextSize(cart): Observable<number> {
    if (cart) {
      const items = Object.keys(cart).map(key => cart[key].quantity);
      const quantity = items.reduce((a, b) => a + b, 0);

      return of(quantity);
    }

    return of(0);
  }

  private toCartArray(cart: DocumentData): Observable<Product[]> {
    if (cart) return of([...Object.values(cart)]);
    else return of([]);
  }

  // Calculation methods

  async deleteCart() {
    this.cartRef.delete();
  }
}
