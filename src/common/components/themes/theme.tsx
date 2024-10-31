import { css } from '@djeka07/utils';
import { iconClass } from './theme.css';
import { Icon, SizeKeys } from '@djeka07/ui';

type ThemeProps = {
  theme: 'dark' | 'light';
  className?: string;
  toggleTheme: () => void;
  size?: SizeKeys;
};

const Theme = ({ theme, toggleTheme, className, size = 'large' }: ThemeProps) => {
  const t = (s: string) => s;
  return <Icon onClick={toggleTheme} className={css(iconClass, theme, className)} name="SunMoon" size={size} />;
};

export default Theme;
