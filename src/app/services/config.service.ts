import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private firebase;

  constructor(
    private http: HttpClient
  ) { }

  public async stripeConfig(){
  let stripe: any;
  this.http.get('api/config/stripe')
    .toPromise()
    .then( ( res: any ) => {
      stripe = res.stripe
    })

    return stripe
  }

}
