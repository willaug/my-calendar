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
      query(':leave', [
        style({
          opacity: 1,
          top: '64px',
          width: '100%',
          position: 'absolute',
          transform: 'translateX(0)',
        }),

        animate('600ms ease-out', style({
          opacity: 0,
          position: 'absolute',
          transform: 'translateX(-10%)',
        })),
      ], optional),
      query(':enter', [
        style({
          opacity: 0,
          top: '64px',
          width: '100%',
          position: 'absolute',
          transform: 'translateX(-10%)',
        }),

        animate('600ms ease-out', style({
          opacity: 1,
          transform: 'translateX(0)',
        })),
      ], optional),
    ]),
  ]),
]);
