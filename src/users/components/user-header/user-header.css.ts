import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  backgroundColor: 'var(--light-background-color)',
  boxShadow: 'var(--main-box-shadow)',
  padding: '20px',
  borderRadius: 'var(--small-border-radius)',
});

export const popupRoot = style({
  alignSelf: 'center',
});

export const nameAndRolesWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 4,
});

export const popup = style({
  minWidth: 300,
});

export const item = style({
  padding: 10,
  cursor: 'pointer',
  transition: '0.3s background ease-in-out',
  backgroundColor: 'var(--light-background-color)',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(60, 60, 60, 0.4)',
    },
  },
});

export const rolesWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: 'var(--600-grey-color)',
  fontSize: 'var(--small-font-size)',
  borderRadius: 'var(--xlarge-border-radius)',
  backgroundColor: 'var(--dark-background-color)',
  padding: '8px 16px',
});
