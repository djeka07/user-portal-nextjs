import { style } from '@vanilla-extract/css';
export const root = style({
  backgroundColor: 'var(--main-background-color)',
  display: 'grid',
  gridTemplateColumns: 'calc(100% - 40px) 40px',
  padding: 10,
  width: '100%',
});
