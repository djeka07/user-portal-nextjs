import { media } from '@djeka07/ui';
import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'grid',
  gap: 16,
});

export const inputs = style({
  display: 'grid',
  gap: 16,
  gridTemplateColumns: '1fr',
  [media.base]: {
    [media.small.up]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
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
