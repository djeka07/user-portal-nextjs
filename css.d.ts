import '@vanilla-extract/css';
import type { PropertiesFallback } from 'csstype';

declare module '@vanilla-extract/css' {
  interface CSSProperties extends PropertiesFallback<number | (string & {})> {
    cx?: number;
    WebkitAppRegion?: 'drag' | 'no-drag';
    '-webkit-text-fill-color': string;
  }
}
