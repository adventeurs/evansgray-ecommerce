import { Component, Input } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Product } from "src/app/models/product";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { ShippingInfoComponent } from "src/app/payments-module/checkout/shipping-info/shipping-info.component";
import { MatDialog } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs/operators";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-cart-display",
  templateUrl: "./cart-display.component.html",
  styleUrls: ["./cart-display.component.scss"]
})
export class CartDisplayComponent {
  @Input() close: boolean = false;
  @Input() displayCart: Product[];
  @Input() cartTotal: Observable<Number>;
  show: boolean = false;
  quantity;

  coupon = new FormGroup({
    code: new FormControl([""])
  });

  get code() {
    return this.coupon.get("code");
  }

  constructor(
    private cart: CartService,
    public auth: AuthService,
    private dialog: MatDialog,
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  removeFromCart(product) {
    this.cart.removeCartItem(product);
  }

  addToCart(product, _quantity) {
    let quantity = parseInt(_quantity);
    this.cart.addToCart(product, quantity);
  }

  openDialog() {
    this.dialog.open(ShippingInfoComponent);
  }

  submitCoupon() {
    let code = this.code.value;
    code = { code };
    console.log(code);
    this.http.get("/api/payment/discount", code).subscribe(
      (res: any) => {
        if (res.percent_off) {
          this.cartTotal.pipe(
            switchMap(products =>
              this.cart.nextTotal(products, res.percent_off)
            )
          );
          this.notification.snackbarAlert("Coupon applied");
        }
        console.log(res);
      },
      error => {
        console.log(error);
        this.notification.snackbarAlert("Coupon not found");
      }
    );
  }
}
