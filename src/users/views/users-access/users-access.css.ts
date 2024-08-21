import { style } from '@vanilla-extract/css';

export const root = style({
  backgroundColor: 'var(--light-background-color)',
  borderRadius: 'var(--small-border-radius)',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
