import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public snackbarAlert(error) {
    if (typeof error === "string") {
      this.snackBar.open(error, "close", {
        duration: 3000
      });
    }
    this.snackBar.open(error.message, "close", {
      duration: 3000
    });
  }

  public email() {
    this.snackBar.open("Thank you for signing up!", "close", {
      duration: 3000
    });
  }
  public snackbarProduct(product) {
    let title = product.title;
    this.snackBar.open(`${title} added to cart!`, "close", {
      duration: 3000
    });
  }

  public discount() {
    this.snackBar.open("Coupon applied!", "close", {
      duration: 3000
    });
  }

  public notFound() {
    this.snackBar.open("Coupon not valid", "close", {
      duration: 3000
    });
  }
}
