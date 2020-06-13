import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable, of, ReplaySubject, BehaviorSubject } from "rxjs";
import { switchMap, tap, mergeMap } from "rxjs/operators";
import { auth, firestore } from "firebase/app";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";
import { OrderData } from "../models/orderData";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userRef: Observable<any>;

  // Access Currently Logged In User
  public get user$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  //  Access Currently Logged In User Details
  public getCurrentUser(): User {
    return this._currentUser$.getValue();
  }

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private notification: NotificationService,
    private http: HttpClient
  ) {
    this.userRef = auth.authState.pipe(
      switchMap(user => {
        // If User Is Logged In
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // If User Is Logged Out
          return of(null);
        }
      })
    );
  }

  private _currentUser$: BehaviorSubject<User>;
  private get currentUser$(): BehaviorSubject<User> {
    if (!this._currentUser$) {
      this._currentUser$ = new BehaviorSubject<User>(undefined);
      this.userRef.subscribe(this._currentUser$);
    }

    return this._currentUser$;
  }

  // Sign-In / Sign-Up User Through GoogleAuthProvider
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.auth.auth.signInWithPopup(provider);

    this.updateUserData(credential.user);
  }

  // Sign-up User With Email And Password
  async emailSignUp(email: string, password: string, name?: string) {
    return this.auth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        this.updateUserData(res.user, name);
      })
      .catch(err => {
        console.log(err);
        this.notification.snackbarAlert(err);
      });
  }

  // Login With Email And Password
  async emailLogin(email: string, password: string) {
    return this.auth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.notification.snackbarAlert(err);
      });
  }

  // Update Firestore User Information
  private async updateUserData(user: User, name?: string) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: name ? name : user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  // Sign Out Currently Logged In User
  async signOut() {
    await this.auth.auth.signOut();
    this.router.navigate(["/"]);
  }

  // Create A Stripe Customer With The StripeAPI
  async createStripeCustomer(name$, email$, customer): Promise<string> {
    let data = {
      name: name$,
      email: email$
    };

    return this.http
      .post("/api/customer", data)
      .pipe(
        tap((res: any) => {
          this.db.doc(`users/${customer.uid}`).set(
            {
              stripeCustomerId: res.id
            },
            { merge: true }
          );
        })
      )
      .toPromise();
  }

  // Update The Users Order History
  async orderSuccess({
    paymentIntent,
    order
  }: {
    paymentIntent;
    order: OrderData;
  }) {
    this.auth.user.subscribe(user => {
      this.db
        .collection("users")
        .doc(user.uid)
        .update({
          orders: firestore.FieldValue.arrayUnion({
            paymentIntent: paymentIntent,
            order: order,
            date: new Date()
          })
        })
        .catch(err => this.notification.snackbarAlert(err));
    });
  }

  public emailList(_email) {
    const { email } = _email;
    this.db
      .doc(`email/${email}`)
      .set({ email })
      .catch(e => console.log(e));
  }
}
