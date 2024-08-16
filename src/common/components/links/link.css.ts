import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const link = recipe({
  base: {
    cursor: 'pointer',
    textDecoration: 'auto',
    display: 'flex',
  },

  variants: {
    color: {
      light: { color: 'var(--light-link-color)' },
      main: { color: 'var(--main-link-color)' },
      dark: { color: 'var(--dark-link-color)' },
    },
    size: {
      small: { fontSize: 'var(--small-font-size)' },
      normal: { fontSize: 'var(--normal-font-size)' },
      large: { fontSize: 'var(--large-font-size)' },
    },
  },

  defaultVariants: {
    color: 'main',
    size: 'normal',
  },
});

export type LinkStyleVariants = RecipeVariants<typeof link>;
