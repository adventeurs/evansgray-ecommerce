import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<any[]>;
  product: Observable<any>;

  constructor( public db: AngularFirestore ) { 
      this.products = this.db.collection('products').doc('categories').collection('ribbon').snapshotChanges();
             
  }

  getAllProducts(){
   return this.db.collection('products').doc('categories').collection('ribbon')
  }

  getProductByTitle( title ){
    console.log(title)
    return this.db.collection('products').doc('categories').collection('ribbon',
                ref => ref.where( 'sku', '==', title ) )
  }

}
