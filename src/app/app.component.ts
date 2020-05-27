import { Component, OnInit } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  NavigationStart
} from "@angular/router";
import { fadeAnimation } from "./common/animations/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
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
      if (event.url.includes("filter")) {
        window.scrollTo(0, 200);
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
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
