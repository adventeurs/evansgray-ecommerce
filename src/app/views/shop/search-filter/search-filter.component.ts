import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
 
  categories;
  colors;
  materials;
  @Input() filter;
  filterSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(){
    this.filterSubscription = this.productService.retrieveFilters()
                                                 .subscribe( ( filters: any ) => {
                                                   this.categories = filters.category
                                                   this.colors = filters.color
                                                   this.materials = filters.material
                                                 })
  }

  
  setFilter( e,  _filter ){
    let currentParams = Object.assign({}, this.route.snapshot.queryParams);
    let params: string [] = currentParams.filter ? currentParams.filter.split(',') : [];

    if( e.checked )
      params.push(_filter);
    else 
      params = params.filter( value => _filter != value);

    this.setQueryParams( params.toString() );

  }

  setQueryParams( _params ){
    this._router.navigate( [] , {
      queryParams: {
        filter: _params
      },
      queryParamsHandling: 'merge'
    });
  }

}
