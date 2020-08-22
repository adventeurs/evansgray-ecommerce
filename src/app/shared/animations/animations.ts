import {
  trigger,
  group,
  transition,
  animate,
  style,
  query
} from "@angular/animations";

export const fader = trigger("routeAnimations", [
  transition("* <=> *", [
    // Set A Default Value For Enter And Leave
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
    // Animate The New Page In
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
