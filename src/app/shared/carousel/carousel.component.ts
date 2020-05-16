import {
  Component,
  AfterViewInit,
  ContentChildren,
  QueryList
} from "@angular/core";
import { CarouselItemDirective } from "../carousel-item.directive";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items: QueryList<
    CarouselItemDirective
  >;

  ngAfterViewInit() {}
}
