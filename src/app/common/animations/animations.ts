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

export const fadeAnimation = animation([
  query(":enter", [style({ opacity: 0 })], { optional: true }),
  query(
    ":leave",
    [style({ opacity: 1 }), animate("0.3s", style({ opacity: 0 }))],
    { optional: true }
  ),
  query(
    ":enter",
    [style({ opacity: 0 }), animate("0.3s", style({ opacity: 1 }))],
    { optional: true }
  )
]);

export const slideAnimation = trigger("slideInOut", [
  transition(":enter", [
    style({ transform: "translateY(-100%)" }),
    animate("200ms ease-in", style({ transform: "translateY(0%)" }))
  ]),
  transition(":leave", [
    animate("200ms ease-in", style({ transform: "translateY(-100%)" }))
  ])
]);

export function slide() {
  return trigger("slide", [
    transition("void => *", [
      style({ transform: "translateX(100%)" }),
      animate(1000)
    ]),
    transition(
      "* => void",
      animate(1000, style({ transform: "translateX(-100%)" }))
    )
  ]);
}
