import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
  stagger,
  state
} from "@angular/animations";

export const fader = trigger("routeAnimations", [
  transition("* <=> *", [
    // Set a default  style for enter and leave
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%"
        })
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(":enter", [style({ transform: `translateX(100%)`, opacity: 0 })], {
      optional: true
    }),
    group([
      query(
        ":leave",
        [
          animate(
            "1s ease-out",
            style({ transform: "translateX(-100%)", opacity: 1 })
          )
        ],
        { optional: true }
      ),
      query(
        ":enter",
        [
          animate(
            "1s ease-out",
            style({ transform: `translate(0, 0)`, opacity: 1 })
          )
        ],
        { optional: true }
      )
    ])
  ])
]);
