import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
  minHeight: 250,
  backgroundColor: 'var(--main-background-color)',
  boxShadow: 'var(--main-box-shadow)',
  borderRadius: 'var(--small-border-radius)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const wrapper = style({
  margin: '20px 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
});

export const content = style({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
});
