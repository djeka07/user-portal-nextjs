import { style } from '@vanilla-extract/css';

export const headingWrapper = style({
  marginBottom: 10,
  paddingBottom: 5,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid var(--400-grey-color)`,
});

export const svg = style({
  fill: '#ffffff',
});

export const panelContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});
