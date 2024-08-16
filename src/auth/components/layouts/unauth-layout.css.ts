import { style } from '@vanilla-extract/css';
import media from '~/styles/media.css';
export const main = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  padding: 16,
  gap: 16,
  [media.base]: {
    [media.small.up]: {
      padding: 24,
      gap: 24,
    },
  },
});

export const message = style({
  maxWidth: 600,
  margin: 'auto',
});

export const formWrapper = style({
  padding: 16,
  position: 'relative',
  backgroundColor: 'var(--main-background-color)',
  boxShadow: 'var(--main-box-shadow)',
  borderRadius: 'var(--small-border-radius)',
  maxWidth: 600,
  display: 'grid',
  gap: 10,
  width: '100%',
  [media.base]: {
    [media.small.up]: {
      padding: 40,
    },
  },
});

export const themeContainer = style({
  position: 'absolute',
  right: 16,
  top: 16,
});
