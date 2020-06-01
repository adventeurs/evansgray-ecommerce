import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { of, BehaviorSubject, Observable } from "rxjs";
import { AngularFirestore, DocumentData } from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { firestore, User } from "firebase/app";
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
          return this.cartRef.valueChanges();
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
    let uid = this.auth.getCurrentUser().uid;
    return this.db.doc<Product>(`carts/${uid}`);
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
    this.cartRef.set(product, { merge: true }).catch(err => {
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
      let items = this.sumQuantity(cart);
      let quantity = this.reduce(items);

      return of(quantity);
    }

    return of(0);
  }

  private toCartArray(cart: DocumentData): Observable<Product[]> {
    if (cart) return of([...Object.values(cart)]);
    else return of([]);
  }

  // Calculation methods

  private sumQuantity(product) {
    if (product) return Object.keys(product).map(key => product[key].quantity);
  }

  private reduce(totals) {
    if (totals) return totals.reduce((a, b) => a + b, 0);
  }
}
