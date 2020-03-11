import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // productsCollection: AngularFirestoreCollection<Product>;
  // products: Observable<any[]>;
  // product: Observable<any>;

  constructor( public db: AngularFirestore ) { 
      // this.products = this.db.collection('products').doc('categories').collection('ribbon').snapshotChanges();
             
  }

  getAllProducts(){
   return this.db.collection('products').doc('categories').collection('ribbon')
  }

  getProductBySku( sku ){
    return this.db.collection('products').doc('categories').collection('ribbon',
                ref => ref.where( 'sku', '==', sku ).limit(1) )
  }

  filterSearch( terms: String[], products: Product[] ) : Product[] {
    

    return
  }
  
}
