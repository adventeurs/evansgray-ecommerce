import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { OrderData } from 'src/app/models/orderData';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  orderData: OrderData;
  close: boolean = false;

  constructor(
    private _location: Location
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

}
