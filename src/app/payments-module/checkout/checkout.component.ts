import { Component, OnInit, Input } from "@angular/core";
import { Location } from "@angular/common";
import { OrderData } from "src/app/models/orderData";
import { MatDialog } from "@angular/material";
import { RefundInfoComponent } from "src/app/payments-module/entry/refund-info/refund-info.component";
import { ShippingInfoComponent } from "src/app/payments-module/entry/shipping-info/shipping-info.component";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
import { TermsComponent } from "src/app/payments-module/entry/terms/terms.component";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  orderData: OrderData;
  close: boolean = false;
  cart$: Observable<Product[]>;
  cartTotal$: Observable<Number>;
  tax;
  discount: string;

  constructor(
    private _location: Location,
    private dialog: MatDialog,
    public _router: Router,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.cartArray;
    this.cartTotal$ = this.cartService.total;
  }

  previous() {
    this._location.back();
  }

  receiveOrder($event) {
    this.orderData = $event;
  }

  receiveClose($event) {
    this.close = $event;
  }

  receiveDiscount($event) {
    this.discount = $event;
  }

  receiveTax($event) {
    this.tax = $event;
  }

  returnToShipping() {
    this.close = !this.close;
  }

  openDialog(value: string) {
    if (value.includes("Term")) this.dialog.open(TermsComponent);

    if (value.includes("Shipping")) this.dialog.open(ShippingInfoComponent);

    if (value.includes("Privacy")) this.dialog.open(RefundInfoComponent);
  }
}
