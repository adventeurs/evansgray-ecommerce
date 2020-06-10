import { Component, OnInit, HostListener } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  NavigationStart
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
  @HostListener("window:beforeunload", ["$event"])
  async doSomething($event) {
    $event.preventDefault();
    await this.cart.abandonedCart();
    return $event;
  }

  title = "evansgray";
  show = false;

  constructor(public _router: Router, private cart: CartService) {
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
}
