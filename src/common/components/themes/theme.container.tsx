'use client';

import { useColorMode } from '~/common/models/hooks';
import Theme from './theme';
import { SizeKeys } from '@djeka07/ui';

type ThemeContainerProps = {
  className?: string;
  size?: SizeKeys;
};

const ThemeContainer = ({ className, size = 'small' }: ThemeContainerProps) => {
  const [{ mode }, { toggleMode }] = useColorMode();
  return <Theme size={size} className={className} theme={mode} toggleTheme={toggleMode} />;
};

export default ThemeContainer;
