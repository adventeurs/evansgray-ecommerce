import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  // TODO: create stripe user
  // TODO: create stripe order
  // TODO: process payment stripe
  stripe: any;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private notification: NotificationService,
    private router: Router,
    private cart: CartService
  ) {}

  pay(stripe, card, orderData) {
    try {
      stripe
        .createPaymentMethod("card", card)
        .then(res => {
          if (res.error) {
            console.log(res.error);
          } else {
            orderData["paymentMethodId"] = res.paymentMethod.id;
            return this.http.post("/api/payment", orderData);
          }
        })
        .then(res =>
          res.subscribe(paymentData => {
            if (paymentData.intent.requiresAction) {
              this.notification.snackbarAlert("requires action");
            } else if (paymentData.intent.error) {
              this.notification.snackbarAlert(paymentData.error);
            } else {
              completeOrder(paymentData.intent.clientSecret, paymentData.order);
            }
          })
        );
    } catch (e) {
      console.log(e);
    }
    // Display order confirmation
    let completeOrder = (clientSecret, order) => {
      stripe.retrievePaymentIntent(clientSecret).then(async res => {
        try {
          await this.auth.orderSuccess({ paymentIntent: res, order });
          this.http.post("/api/email/confirmation", order).toPromise();
          this.cart.deleteCart();
        } catch (e) {
          console.log(e);
        }
        this.router.navigate([
          "/",
          "checkout",
          "success",
          order.email,
          order.amount
        ]);
      });
    };
  }
}
