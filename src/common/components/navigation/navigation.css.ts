import { style } from '@vanilla-extract/css';
import media from '~/styles/media.css';

export const root = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  [media.base]: {
    [media.small.up]: {
      position: 'sticky',
      top: 0,
    },
  },
});

export const navigation = style({
  backgroundColor: 'var(--main-background-color)',
  boxShadow: 'var(--main-box-shadow)',
  [media.base]: {
    [media.small.up]: {
      padding: '0 10px',
    },
  },
});

export const li = style({
  width: '20%',
  [media.base]: {
    [media.small.up]: {
      width: 'auto',
    },
  },
});

export const hideLiInMobile = style({
  width: '20%',
  display: 'none',
  [media.base]: {
    [media.small.up]: {
      width: 'auto',
      display: 'block',
    },
  },
});

export const item = style({
  padding: '10px 0',
  color: 'var(--main-link-color)',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  gap: 2,
  [media.base]: {
    [media.small.up]: {
      padding: '10px 10px',
      width: 'auto',
    },
  },
});

export const themeLi = style({
  position: 'absolute',
  right: 10,
});

export const truncated = style({
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0 4px',
});

export const logoutButton = style({
  background: 'none',
  border: 0,
  padding: 0,
  color: 'var(--main-link-color)',
  fontFamily: 'var(--base-font-family)',
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'center',
  justifyContent: 'center',
});

export const list = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyle: 'none',
  paddingInlineStart: 0,
  marginBlockStart: 0,
  marginBlockEnd: 0,
  [media.base]: {
    [media.small.up]: {
      justifyContent: 'center',
    },
  },
});

export const loginList = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});

export const icon = style({
  fill: 'var(--main-link-color)',
  width: 20,
  height: 20,
});
