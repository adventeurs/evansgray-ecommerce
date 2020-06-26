import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { OrderData } from "src/app/models/orderData";
import { MatDialog } from "@angular/material";
import { RefundInfoComponent } from "src/app/payments-module/checkout/refund-info/refund-info.component";
import { ShippingInfoComponent } from "src/app/payments-module/checkout/shipping-info/shipping-info.component";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
import { TermsComponent } from "src/app/payments-module/checkout/terms/terms.component";

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

  returnToShipping() {
    this.close = !this.close;
  }

  openDialog(value: string) {
    console.log(value);
    if (value.includes("Term")) this.dialog.open(TermsComponent);

    if (value.includes("Shipping")) this.dialog.open(ShippingInfoComponent);

    if (value.includes("Privacy")) this.dialog.open(RefundInfoComponent);
  }
}
