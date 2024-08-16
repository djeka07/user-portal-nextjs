import { globalStyle, GlobalStyleRule, style } from '@vanilla-extract/css';

export const iconClass = style({});

globalStyle(`${iconClass}.dark > .moon > circle`, {
  cx: 17,
  transform: 'translateX(0)',
} as GlobalStyleRule & { cx: number });

globalStyle(`${iconClass}.dark .sun`, {
  transform: 'scale(1.75)',
});

globalStyle(`${iconClass}.dark .sun-beams `, {
  opacity: 0,
});

globalStyle(`${iconClass} .sun-beams `, {
  fill: 'var(--main-text-color)',
  stroke: 'var(--main-text-color)',
  strokeWidth: 2,
  strokeLinecap: 'round',
});

globalStyle(`${iconClass} > :is(.moon, .sun, .sun-beams)`, {
  transformOrigin: 'center',
});

globalStyle(`${iconClass}.dark > :is(.moon, .sun)`, {
  fill: 'white',
});

globalStyle(`${iconClass} > .sun`, {
  transition: 'transform .5s cubic-bezier(.5, 1, .75, 1.25)',
  fill: 'var(--main-text-color)',
});

globalStyle(`${iconClass} > .sun-beams`, {
  transition: 'transform .5s cubic-bezier(.5, 1.5, .75, 1.25), opacity .5s cubic-bezier(.25, 0, .3, 1)',
});

globalStyle(`${iconClass} > .moon > circle`, {
  transition: 'transform .25s cubic-bezier(0, 0, 0, 1), cx 0.25s cubic-bezier(0, 0, 0, 1)',
});

globalStyle(`${iconClass}.dark > .sun`, {
  transitionTimingFunction: 'cubic-bezier(.25, 0, .3, 1)',
  transitionDuration: '.25s',
  transform: 'scale(1.75)',
});

globalStyle(`${iconClass}.dark > .sun-beams`, {
  transitionDuration: '.15s',
  transform: 'rotateZ(-25deg)',
});

globalStyle(`${iconClass}.dark > .moon > circle`, {
  transitionDuration: '.5s',
  transitionDelay: '.25s',
});
