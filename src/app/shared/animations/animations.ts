import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, stagger, state
} from '@angular/animations';

export const fadeAnimation = animation([
  query(
      ':enter',
      [ style({ opacity: 0 }) ],
      { optional: true }
    ),
  query(
      ':leave',
       [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
      { optional: true }
    ),
  query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])