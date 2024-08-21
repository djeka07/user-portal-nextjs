import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
  minHeight: 250,
  backgroundColor: 'var(--main-background-color)',
  boxShadow: 'var(--main-boxshadow-color)',
  borderRadius: 'var(--small-border-radius)',
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const wrapper = style({
  margin: '20px 0',
});

export const userWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const usersCount = style({
  color: 'var(--main-heading-color)',
  fontWeight: 'var(--bold-font-weight)',
  fontSize: 'var(--large-font-size)',
});

export const buttonWrapper = style({
  margin: '20px 0',
  width: '100%',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'center',
});

export const textWrapper = style({
  width: '100%',
});
