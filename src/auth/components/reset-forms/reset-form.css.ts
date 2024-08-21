import { style } from '@vanilla-extract/css';
import media from '~/styles/media.css';

export const form = style({
  display: 'grid',
  gap: 20,
});

export const buttonWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
  [media.base]: {
    [media.small.up]: {
      gap: 20,
      flexDirection: 'row',
    },
  },
});

export const link = style({
  padding: '16px 0',
  [media.base]: {
    [media.small.up]: {
      padding: 0,
    },
  },
});
