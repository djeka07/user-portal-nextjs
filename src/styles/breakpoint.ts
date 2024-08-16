export enum BreakPoint {
  xs = 'xs',
  xsx = 'xsx',
  xsm = 'xsm',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  lgx = 'lgx',
  xl = 'xl',
}

export type BreakPointEnumKeys = keyof typeof BreakPoint;

export type BreakPoints = {
  keys: BreakPoint[];
  values: { [key in BreakPointEnumKeys]: number };
  unit: string;
  steps: number;
  direction: string;
};

export type BreakPointProps = BreakPoints & {
  up(key: BreakPoint | number): string;
  down(key: BreakPoint | number): string;
  between(start: BreakPoint, end: BreakPoint): string;
  only(key: BreakPoint): string;
  width(key: BreakPoint): number;
  onlyEdge: string;
  hover: string;
  onlyIE: string;
};

export const baseBreakPoints: BreakPoints = {
  keys: [
    BreakPoint.xs,
    BreakPoint.xsx,
    BreakPoint.xsm,
    BreakPoint.sm,
    BreakPoint.md,
    BreakPoint.lg,
    BreakPoint.lgx,
    BreakPoint.xl,
  ],
  values: {
    xs: 0,
    xsx: 425,
    xsm: 600,
    sm: 768,
    md: 960,
    lg: 1280,
    lgx: 1700,
    xl: 1920,
  },
  unit: 'px',
  steps: 8,
  direction: 'ltr',
};

const up = (key: BreakPoint | number): string => {
  const value =
    typeof baseBreakPoints.values[key as BreakPoint] === 'number' ? baseBreakPoints.values[key as BreakPoint] : key;
  return `@media (min-width:${value}${baseBreakPoints.unit})`;
};

const down = (key: BreakPoint | number): string => {
  const nextIndex = baseBreakPoints.keys.indexOf(key as BreakPoint) + 1;
  const upperbound = baseBreakPoints.values[baseBreakPoints.keys[nextIndex]];

  if (nextIndex === baseBreakPoints.keys.length) {
    return up(BreakPoint.xs);
  }
  const value = typeof upperbound === 'number' && nextIndex > 0 ? upperbound : (key as number);
  return `@media (max-width:${value - baseBreakPoints.steps / 100}${baseBreakPoints.unit})`;
};

const between = (start: BreakPoint, end: BreakPoint): string => {
  const endIndex = baseBreakPoints.keys.indexOf(end) + 1;

  if (endIndex === baseBreakPoints.keys.length) {
    return up(start);
  }

  return (
    `@media (min-width:${baseBreakPoints.values[start]}${baseBreakPoints.unit}) and ` +
    `(max-width:${baseBreakPoints.values[baseBreakPoints.keys[endIndex]] - baseBreakPoints.steps / 100}${
      baseBreakPoints.unit
    })`
  );
};

const only = (key: BreakPoint): string => between(key, key);
const width = (key: BreakPoint): number => baseBreakPoints.values[key];

const onlyEdge = '@supports (-ms-ime-align:auto)';
const onlyIE = '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)';
const hover = '@media(hover: hover)';

const breakPoint = (): BreakPointProps => ({
  ...baseBreakPoints,
  up,
  down,
  between,
  only,
  width,
  onlyEdge,
  onlyIE,
  hover,
});

export default breakPoint;
