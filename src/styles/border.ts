export type Radius = {
  none: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  xxlarge: string;
  round: string;
};

export type RadiusKeys = keyof Radius;

export type Border = {
  radius: Radius;
};

export default {
  radius: {
    none: '0px',
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    xxlarge: '20px',
    round: '50%',
  },
} satisfies Border;
