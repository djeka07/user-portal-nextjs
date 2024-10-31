import { media } from '@djeka07/ui';
import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'grid',
  gap: 16,
});

export const buttonWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [media.base]: {
    [media.small.up]: {
      flexDirection: 'row',
      gap: 20,
    },
  },
});

export const message = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const linkWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 0,
  width: '100%',
  [media.base]: {
    [media.small.up]: {
      width: 'auto',
      gap: 5,
      flexDirection: 'column',
    },
  },
});

export const link = style({
  padding: '16px 0px',
  [media.base]: {
    [media.small.up]: {
      padding: 0,
    },
  },
});
