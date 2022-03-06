import {
  group,
  style,
  query,
  trigger,
  animate,
  transition,
} from '@angular/animations';

const optional = { optional: true };
export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    group([
      query(':enter, :leave', [
        style({
          position: 'fixed',
          width: '100%',
        }),
      ], optional),
      query(':enter', [
        style({
          transform: 'translateX(100%)',
        }),
        animate(700, style({
          transform: 'translateX(0%)',
        })),
      ], optional),
      query(':leave', [
        style({
          transform: 'translateX(0%)',
        }),
        animate(700, style({
          transform: 'translateX(-100%)',
        })),
      ], optional),
    ]),
  ]),
]);
