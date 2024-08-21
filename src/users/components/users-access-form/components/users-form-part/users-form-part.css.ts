import { style } from '@vanilla-extract/css';

export const selectAllCheckbox = style({
  marginBottom: 8,
  borderBottom: '1px solid var(--400-grey-color)',
  paddingBottom: 8,
  fontWeight: 'bold',
});

export const message = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});
