import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { OrderData } from 'src/app/models/orderData';
import { MatDialog } from '@angular/material';
import { RefundInfoComponent } from 'src/app/shared/refund-info/refund-info.component';
import { ShippingInfoComponent } from 'src/app/shared/shipping-info/shipping-info.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  orderData: OrderData;
  close: boolean = false;

  constructor(
    private _location: Location,
    private dialog: MatDialog,
    public _router: Router
  ) { }

  previous(){
    this._location.back()
  }

  receiveOrder( $event){
    this.orderData = $event
  }

  receiveClose( $event){
    this.close = $event
  }

  returnToShipping(){
    this.close = !this.close
  }

  openDialog( value : string ){

    if( value.toLowerCase() === 'refunds')
      this.dialog.open(ShippingInfoComponent)
    
    if(value.toLowerCase() === 'shipping')
      this.dialog.open(RefundInfoComponent)

    }

}
