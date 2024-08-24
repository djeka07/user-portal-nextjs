import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  padding: '20px',
  flex: 1,
  overflow: 'auto',
  '::-webkit-scrollbar': {
    width: 10,
  },
  scrollbarColor: '#999 #333',
  '::-webkit-scrollbar-thumb': {
    background: '#999',
    borderRadius: 10,
  },
  '::-webkit-scrollbar-track': {
    background: 'rgb(53, 64, 82)',
    borderRadius: 10,
  },
});

export const messages = recipe({
  base: {
    display: 'grid',
    opacity: 0,
    transition: 'all 0.3s',
    gap: 10,
  },
  variants: {
    show: { true: { opacity: 1 } },
  },
  defaultVariants: {
    show: undefined,
  },
});

export const spinnerWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
