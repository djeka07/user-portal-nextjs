import { useContext } from 'react';
import { ColorModeContext } from '../contexts/color-mode.context';

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('Theme context must be used in a theme provider');
  }

  return context;
};

export default useColorMode;