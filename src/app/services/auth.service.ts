import { Injectable, Input } from '@angular/core';
import { User } from '../models/user';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators'
import { auth } from 'firebase/app';
import { LoginModalService } from './login-modal.service';
import { NotificationService } from './notification.service';
import { CustomerService } from './customer.service';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser = new ReplaySubject<firebase.User>(1)

  get user$(): Observable<firebase.User> {
    return this.loggedInUser.asObservable()
  }
  
  constructor(
      private db: AngularFirestore,
      private fireAuth: AngularFireAuth,
      private router: Router,
      public loginModal: LoginModalService,
      private notification: NotificationService,
      private customerService: CustomerService,
      ) { 
      fireAuth.authState.pipe(
        switchMap( user => {
          if ( user ){
            localStorage.setItem('cartId', user.uid )
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null)
          }
        })
      ).subscribe( user => {
        this.loggedInUser.next(user);
      })
    }

  

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);

    this.loginModal.toggleModal.emit(false)

    return this.updateUserData(credential.user);

  }

  async emailSignUp( email: string, password: string, name?: string ){
    this.fireAuth.auth.createUserWithEmailAndPassword( email , password )
        .then( async res => {
          this.updateUserData(res.user, name)        
        })
        .then( () => this.loginModal.toggleModal.emit(false) )
        .catch( ( err ) =>{
          console.log(err);
          this.notification.snackbarAlert( err )}
        );

  }

  async emailLogin( email: string, password: string){
    this.fireAuth.auth.signInWithEmailAndPassword( email , password )
        .then( () => this.loginModal.toggleModal.emit(false) )
        .catch( ( err ) => {
          this.notification.snackbarAlert( err )
        });
    

  }

  private async updateUserData( user: User , name?: string) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const customerId = await this.customerService.createStripeCustomer( name, user.email )
                                 .then( ( res: any ) => { return res.id } )   
                                 .catch( err => this.notification.snackbarAlert( err ))
          
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: name ? name : user.displayName, 
      photoURL: user.photoURL,
      stripeCustomerId: customerId
    } 

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
