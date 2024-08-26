import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const messageWrapper = recipe({
  base: {
    justifySelf: 'left',
    maxWidth: '90%',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },
  variants: {
    user: {
      current: { justifySelf: 'right', alignItems: 'flex-end' },
    },
  },
  defaultVariants: {
    user: undefined,
  },
});

export const userWrapper = recipe({
  variants: {
    isGroup: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});

export const message = recipe({
  base: {
    padding: '8px 12px',
    background: 'var(--600-grey-color)',
    justifySelf: 'left',
    color: 'var(--light-link-color)',
    borderRadius: 18,
    width: '100%',
  },
  variants: {
    user: {
      current: { justifySelf: 'right', backgroundColor: 'rgb(0, 132, 255)' },
    },
  },
  defaultVariants: {
    user: undefined,
  },
});

export const badgeMessageWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const badge = style({
  flexShrink: 0,
});
