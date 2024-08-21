import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'fixed',
  top: 70,
  zIndex: 1,
  right: 20,
  backgroundColor: 'var(--light-background-color)',
  padding: 15,
  width: 200,
  borderRadius: 'var(--small-border-radius)',
  boxShadow: 'var(--main-box-shadow)',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
});

export const motionClass = style({
  position: 'relative',
  zIndex: 1,
});
