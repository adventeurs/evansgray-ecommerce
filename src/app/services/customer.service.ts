import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
      private db: AngularFirestore,
      private fireAuth: AngularFireAuth,
      private router: Router,
      private http: HttpClient
  ) { }

  async createStripeCustomer( name$, email$ ){
    let data = {
      'name': name$,
      'email': email$
    }

    return this.http.post('http://localhost:3000/customer', data).toPromise()
  }

  async cartId(){
    let data = {
 
    }

    return this.http.post('http://localhost:3000/customer', data).toPromise()
  }
}
