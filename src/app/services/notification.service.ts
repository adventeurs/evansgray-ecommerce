import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
      private snackBar: MatSnackBar
  ) { }

  public snackbarAlert( error ){
    this.snackBar.open( error.message, "close" , {
      duration: 3000
    })
  }

  public snackbarProduct( product){
    let category = product.category;
    this.snackBar.open( `${category} added to cart!`, "close" , {
      duration: 3000
    })
  }
}
