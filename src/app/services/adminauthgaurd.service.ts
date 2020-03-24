import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurd {

  constructor(
    private auth: AuthService
  ) {
   }

   canActivate(){
     return this.auth.user$.pipe(
       map( ( user: User ) => {
         if(!user || !user.admin){
           return false
         }
         return true
       }),
       take(1)
     )
   }
}
