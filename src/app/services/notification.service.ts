import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  duration: number;

  constructor(
      public snackBar: MatSnackBar
  ) { }

  public snackbarAlert( error ){
    this.snackBar.open( error.message, "close" , {
      duration: 2000
    })
  }
}
