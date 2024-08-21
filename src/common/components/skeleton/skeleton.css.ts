import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { keyframes, style } from '@vanilla-extract/css';

const ghostAni = keyframes({
  '0%': {
    backgroundPosition: '-468px 0',
  },
  '100%': {
    backgroundPosition: '468px 0',
  },
});

export const ghostAnimation = style({
  animationFillMode: 'forwards',
  background: 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%) 0% 0% / 900px 104px',
  animation: `${ghostAni} 1s linear infinite`,
});

export const skeleton = recipe({
  base: {
    animationFillMode: 'forwards',
    background: 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%) 0% 0% / 900px 104px',
    animation: `${ghostAni} 1s linear infinite`,
    width: '100%',
  },
  variants: {
    radius: {
      none: { borderRadius: 0 },
      small: { borderRadius: 'var(--small-border-radius)' },
      medium: { borderRadius: 'var(--medium-border-radius)' },
      large: { borderRadius: 'var(--large-border-radius)' },
      xlarge: { borderRadius: 'var(--xlarge-border-radius)' },
      xxlarge: { borderRadius: 'var(--xxlarge-border-radius)' },
      round: { borderRadius: 'var(--round-border-radius)' },
    },
  },
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export type SkeletonVariants = RecipeVariants<typeof skeleton>;
