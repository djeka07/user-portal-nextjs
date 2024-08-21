import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
});
