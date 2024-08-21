import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
});
