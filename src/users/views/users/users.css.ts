import { style } from '@vanilla-extract/css';
export const root = style({
  width: '100%',
});

export const main = style({
  margin: 20,
  flexGrow: 1,
});

export const aside = style({
  width: 250,
  padding: 10,
  backgroundColor: 'rgb(53, 64, 82)',
  position: 'relative',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 8,
  marginTop: 20,
});
