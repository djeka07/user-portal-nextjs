import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = style({
  display: 'flex',
  background:  'var(--main-background-color)',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 4,
  gap: 10,
});

export const participantsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 8,
  gap: 4,
});

export const statusWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const wrapper = style({
  display: 'flex',
  border: 0,
  backgroundColor: 'transparent',
  alignItems: 'center',
  gap: 4,
  borderRadius: 'var(--medium-border-radius)',
  selectors: {
    '&&&': {
      padding: 0,
    },
  },
});

export const linkContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const status = recipe({
  base: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'var(--main-error-color)',
  },
  variants: {
    status: {
      online: { backgroundColor:  'var(--main-success-color)' },
    },
  },
  defaultVariants: {
    status: undefined,
  },
});

export const infoSkeleton = style({
  selectors: {
    '&&&': {
      marginRight: 15,
    },
  },
});
