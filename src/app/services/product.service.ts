import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { Product } from '../models/product';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  filter$ = of(['gold', 'blue', 'green'])

  constructor( public db: AngularFirestore ) { 
      // this.products = this.db.collection('products').doc('categories').collection('ribbon').snapshotChanges();
             
  }

  getAllProducts(){
   return this.db.collection('products').doc('categories').collection('ribbon')
              .valueChanges()
  }   

  getProductBySku( sku ){
    return this.db.collection('products').doc('categories').collection('ribbon',
                ref => ref.where( 'sku', '==', sku ).limit(1) )
  }

  filter(  product, filter: String[]){
    if(filter.length == 0)
      return true

    for(let i = 0; i < filter.length; i++){
      if(product.searchable.includes(filter[i]))
        return true
    }

  }
  
}
