'use client';

import { createDefaultTheme, createStyleSheet } from '@djeka07/ui';
import { useColorMode } from '~/common/models/hooks';

const StylesSheet = () => {
  const [{ mode }] = useColorMode();
  return <>{createStyleSheet(createDefaultTheme(mode))}</>;
};

export default StylesSheet;
