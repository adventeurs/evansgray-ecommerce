import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { of, combineLatest, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Product } from "src/app/models/product";
import { HttpClient } from "@angular/common/http";
import { ShopAllComponent } from "./components/shop-all.component";
import { NotionsComponent } from "./components/notions.component";
import { RibbonFeatureComponent } from "./components/ribbonFeature.component";
import { ForHomeComponent } from "./components/for-home.component";
import { ForBodyComponent } from "./components/for-body.component";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  filter: string;
  loading: boolean = true;
  product$: Observable<Product[]>;
  feature = { component: ShopAllComponent };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.product$ = combineLatest(
      this.route.queryParamMap,
      this.productService.getProducts()
    ).pipe(
      switchMap(([params, products]: [ParamMap, Product[]]) => {
        this.filter = params.getAll("filter").toString();
        this.setFeature();

        let filteredProducts = this.filter
          ? this.filterProducts(products)
          : products;
        this.loading = false;

        return of(filteredProducts);
      })
    );
  }

  filterProducts(products): Product[] {
    return products.filter(products =>
      this.productService.filter(products, this.filter.split(","))
    );
  }

  setFeature() {
    if (this.filter === "") this.feature.component = ShopAllComponent;
    else if (this.filter.includes("notions"))
      this.feature.component = NotionsComponent;
    else if (this.filter.includes("ribbon"))
      this.feature.component = RibbonFeatureComponent;
    else if (this.filter.includes("aprons"))
      this.feature.component = ForBodyComponent;
    else if (
      this.filter.includes("table-runners") ||
      this.filter.includes("napkins")
    )
      this.feature.component = ForHomeComponent;
  }
}
