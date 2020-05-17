import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { CarouselItemDirective } from "../carousel-item.directive";
import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style
} from "@angular/animations";

@Directive({
  selector: ".carousel-item"
})
export class CarouselItemElement {}

@Component({
  selector: "carousel",
  exportAs: "carousel",
  templateUrl: "./carousel.component.html",
  styles: [
    `
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 6000px;
      }

      .carousel-wrapper {
        overflow: hidden;
      }

      .carousel-inner {
        display: flex;
      }
    `
  ]
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items: QueryList<
    CarouselItemDirective
  >;
  @ViewChildren(CarouselItemElement, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  @ViewChild("carousel", { static: true }) private carousel: ElementRef;
  @Input() timing = "1s cubic-bezier(.5,-0.25,.28,1.69)";
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  next() {
    if (this.currentSlide === this.items.length) this.currentSlide = 0;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    if (this.currentSlide === 0) this.currentSlide = this.items.length;

    this.currentSlide =
      (this.currentSlide - 1 + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });
  }
}
