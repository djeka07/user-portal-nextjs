import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
});

export const popupContent = style({
  padding: 8,
  right: 0,
  background: 'var(--light-background-color)',
  color: '#ffffff',
  position: 'absolute',
  left: 0,
  top: '100%',
  boxShadow: 'var(--box-shadow-main)',
});

export const pillWrapper = style({
  selectors: {
    '&&': {
      borderBottom: '1px solid var(--400-grey-color)',
      padding: 8,
    },
  },
});

export const user = style({
  padding: '10px 10px',
  transition: '0.3s all ease-in-out',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: 3,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
