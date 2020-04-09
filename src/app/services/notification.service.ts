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
    if(typeof error === 'string'){
      this.snackBar.open( error, "close" , {
        duration: 3000
      })
    }
    this.snackBar.open( error.message, "close" , {
      duration: 3000
    })
  }

  public snackbarProduct( product){
    let title = product.title;
    this.snackBar.open( `${title} added to cart!`, "close" , {
      duration: 3000
    })

  }
}
