import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, NavigationStart } from '@angular/router';
import {   fadeFrames, moveFromRightFade } from './shared/animations/animations';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evansgray';
  show = false;

  constructor(
    public _router: Router,
  ){
    _router.events.subscribe(  event  => {
      if ( event instanceof NavigationEnd ){
        setTimeout( () => this.show = true, 1000 )
      }
      if ( event instanceof NavigationStart ){
        this.show = false;
      }
    })
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
