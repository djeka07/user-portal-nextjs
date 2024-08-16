import createBorder, { Border } from './border';
import createBreakPoints, { BreakPointProps } from './breakpoint';
import createTypography from './typography';
import createPalette, { Palette } from './palette';
import { Theme } from '@djeka07/ui';

const createTheme = (theme: 'dark' | 'light') =>
  ({
    typography: createTypography,
    breakpoint: createBreakPoints(),
    palette: createPalette(theme),
    border: createBorder,
  }) satisfies Theme;

export default createTheme