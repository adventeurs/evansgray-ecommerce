import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
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

// Carousel Item
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
        margin: auto;
        margin-top: -16em;
      }

      .carousel-inner {
        display: flex;
      }

      .controls {
        display: flex;
        justify-content: space-around;
      }
    `
  ]
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items: QueryList<
    CarouselItemDirective
  >;
  @ViewChildren(CarouselItemElement, { read: ElementRef })
  @ViewChild("carousel", { static: true })
  @Input()
  timing = "1s cubic-bezier(.5,-0.25,.28,1.69)";
  @Input() showControls = true;
  private carousel: ElementRef;
  private itemsElements: QueryList<ElementRef>;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    this.carouselWrapperStyle = {
      width: `${this.itemWidth}px`
      // width: "100%",
      // paddingLeft: "15%"
    };
  }

  // Translate X Animation Based On Calculated Offset
  private slideAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  // Determine Offset For Slide Animation
  private getOffset(value) {
    // Increment If True
    if (value) this.currentSlide = (this.currentSlide + 1) % this.items.length;
    // Decrement If False
    else {
      this.currentSlide =
        (this.currentSlide - 1 + this.items.length) % this.items.length;
    }
    return this.currentSlide * this.itemWidth;
  }

  // Next Slide
  next() {
    if (this.currentSlide === this.items.length) this.currentSlide = 0;

    const offset = this.getOffset(1);

    const myAnimation: AnimationFactory = this.slideAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  // Previous Slide
  prev() {
    if (this.currentSlide === 0) this.currentSlide = this.items.length;

    const offset = this.getOffset(0);

    const myAnimation: AnimationFactory = this.slideAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
}
