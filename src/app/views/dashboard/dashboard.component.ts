import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  categories: string[];
  colors: string[];
  materials: string[];
  images = [];

  productInput = new FormGroup({
    inventory: new FormControl( '', []),
    main: new FormControl( '', []),
    sku: new FormControl( '', []),
    type: new FormControl( '', []),
    category: new FormControl( '', []),
    categories: new FormControl( '', []),
    colors: new FormControl( '', []),
    material: new FormControl( '', []),
    title: new FormControl( '', []),
    description: new FormControl( '', []),
    snippet: new FormControl( '', []),
    price: new FormControl( '', []),
    color: new FormControl( '', []),
    care: new FormControl( '', []),
    styling: new FormControl( '', []),
    imgs: new FormControl( '', []),
  })

  constructor( 
    private db: AngularFirestore,
    private productService: ProductService
    ) { 
    }

    ngOnInit(): void {
      this.productService.retrieveFilters().subscribe( (f: any) => {
                                                        this.categories = f.category;
                                                        this.colors = f.color ;
                                                        this.materials = f.material; 
                                                     })
    }

  addProduct( product ){
    let productForm = {
        inventory: product.inventory,
        main: product.main,
        parent: product.sku,
        type: 'sku',
        sku: product.sku,
        category: product.category,
        searchable: product.searchable.split(','),
        title: product.title,
        description: product.description,
        snippet: product.snippet,
        price: product.price,
        color: product.color,
        care : product.care,
        styling: product.styling,
        images: product.imgs.split(',')
    }

    console.log(productForm)
    this.db.collection('products').doc(product.title).set( productForm ).catch( err => console.log(err))
    this.productInput.reset()
  }

}
