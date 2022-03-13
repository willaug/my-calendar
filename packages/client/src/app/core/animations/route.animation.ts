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
          opacity: 0,
          width: '100%',
          position: 'absolute',
        }),
      ], optional),
      query(':enter', [
        style({
          transform: 'translateX(-10%)',
        }),
        animate(400, style({
          transform: 'translateX(0%)',
          opacity: 1,
        })),
      ], optional),
    ]),
  ]),
]);
