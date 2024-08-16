import { Typography } from '@djeka07/ui/src/styles/typography';

export default {
  family: {
    body: 'Campton, Helvetica, sans-serif;',
    heading: 'Campton, Helvetica, sans-serif;',
  },
  weight: {
    light: '100',
    regular: '400',
    bold: '700',
  },
  size: {
    xxxsmall: '0.5rem',
    xxsmall: '0.625rem',
    xsmall: '0.75rem',
    small: '0.875rem',
    normal: '1rem',
    medium: '1.125rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '1.75rem',
    xxxlarge: '2.rem',
  },
  fontFace: [
    {
      family: 'Campton',
      src: [
        { url: 'https://solid-static.azureedge.net/static/fonts/subset-Campton-Book.woff2', format: 'woff2' },
        { url: 'https://solid-static.azureedge.net/static/fonts/subset-Campton-Book.woff', format: 'woff' },
      ],
      weight: 400,
      style: 'normal',
      display: 'swap',
    },
    {
      family: 'Campton',
      src: [
        { url: 'https://solid-static.azureedge.net/static/fonts/subset-Campton-Light.woff2', format: 'woff2' },
        { url: 'https://solid-static.azureedge.net/static/fonts/subset-Campton-Light.woff', format: 'woff' },
      ],
      weight: 300,
      style: 'normal',
      display: 'swap',
    },
    {
      family: 'Campton',
      src: [
        { url: 'https://solid-static.azureedge.net/static/fonts/subset-Campton-Bold.woff2', format: 'woff2' },
        { url: 'https://solid-static.azureedge.net/static/fonts/subset-Campton-Bold.woff', format: 'woff' },
      ],
      weight: 700,
      style: 'normal',
      display: 'swap',
    },
  ],
} satisfies Typography;
