import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter(false);

}
