import { Component, OnInit, HostListener } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  NavigationStart,
  RouterEvent
} from "@angular/router";
import { CartService } from "./services/cart.service";
import { fader } from "./common/animations/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fader]
})
export class AppComponent implements OnInit {
  title = "evansgray";
  show = false;

  constructor(public _router: Router, private cart: CartService) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => (this.show = true), 1100);
      }
      if (event instanceof NavigationStart) {
        this.show = false;
      }
    });
  }

  ngOnInit() {
    this._router.events.subscribe((event: RouterEvent) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      if (!event.url.includes("filter")) {
        window.scrollTo(0, 0);
      }

      if (this._router.url.includes("filter")) {
        window.scrollTo(0, 0);
        console.log("hello");
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
    if (event) {
      document.body.style.overflow = "hidden";
    }
    document.body.style.overflow = "visible";
  }
}
