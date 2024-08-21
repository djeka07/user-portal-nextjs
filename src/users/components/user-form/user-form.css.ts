import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const form = style({
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const error = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});
