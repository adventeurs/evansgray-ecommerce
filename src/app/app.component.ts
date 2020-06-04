import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  NavigationStart
} from "@angular/router";
import { transition, trigger, query, style, animate, group } from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      // Animate the new page in
      query(':enter', [
        style({ transform: `translateX(100%)`, opacity: 0 })
      ]),
      group([
        query(':leave', [
          animate('1s ease-out', style({ transform: 'translateX(-100%)', opacity: 1 }))
        ], { optional: true }),
        query(':enter', [
          animate('1s ease-out', style({ transform: `translate(0, 0)`, opacity: 1}))
        ])
      ]),
    ])
  ]);


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"], 
  animations: [
    fader
  ]
})

export class AppComponent implements OnInit {
  title = "evansgray";
  show = false;

  constructor(public _router: Router) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => (this.show = true), 1000);
      }
      if (event instanceof NavigationStart) {
        this.show = false;
      }
    });
  }

  ngOnInit() {
    this._router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      if (!event.url.includes("filter")) {
        window.scrollTo(0, 0);
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  receiveOverflow(event: Event) {
    console.log(event);
    if (event) {
      document.body.style.overflow = "hidden";
    }
    document.body.style.overflow = "visible";
  }

  checkCartAbandoned() {}
}
