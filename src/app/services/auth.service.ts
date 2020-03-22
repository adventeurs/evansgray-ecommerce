import { Injectable} from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators'
import { auth } from 'firebase/app';
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'dns';


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
      private notification: NotificationService,
      private http: HttpClient
      ) { 
    fireAuth.authState.pipe(
        switchMap( user => {
          if ( user ){
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

     this.updateUserData(credential.user);

  }

  async emailSignUp( email: string, password: string, name?: string ){
    return this.fireAuth.auth.createUserWithEmailAndPassword( email , password )
        .then( async res => {
          this.updateUserData(res.user, name)        
        })
        .catch( ( err ) =>{
          console.log(err);
          this.notification.snackbarAlert( err )}
        );

  }

  async emailLogin( email: string, password: string){
    return this.fireAuth.auth.signInWithEmailAndPassword( email , password )
        .catch( ( err ) => {
          this.notification.snackbarAlert( err )
        });
    

  }

  private async updateUserData( user: User , name?: string) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
              
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: name ? name : user.displayName, 
      photoURL: user.photoURL,
    } 

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/']);

  }

  async createStripeCustomer( name$, email$, customer ){
    let data = {
      'name': name$,
      'email': email$
    }
    
    return this.http.post('http://localhost:3000/customer', data)
                      .pipe(
                        tap( ( res: any ) => {
                          this.db.doc(`users/${customer.uid}`).set( 
                            { stripeCustomerId : res.id} 
                          )
                        })).toPromise()
  }

  async orderSuccess( paymentObject ): Promise<Object> {
    const { intent, order } = paymentObject
    let time = new Date()
    
    this.loggedInUser.subscribe( user => {
                this.db.doc(`users/${user.uid}`).update({
                  order: [
                    { date: time,
                      shipping: intent.shipping,
                      items: order.items,
                      amount: order.amount,
                      paymentIntent: intent,
                      order: order
                      }
                  ]
                }).catch( err =>{
                  console.log(err);
                  this.notification.snackbarAlert(err);
                });
              }).unsubscribe()
    
    return {
      name: order.name,
      email: order.email,
      amount: order.amount,
      date: time,
    }       
  }

}
