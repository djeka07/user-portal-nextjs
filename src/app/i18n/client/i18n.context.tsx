'use client';

import { JSX, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nInstance from '~/app/i18n/client/client-init';

type I18nProviderProps = { children: ReactNode; language: string };

export const I18nClientProvider = ({ children, language }: I18nProviderProps): JSX.Element => {
  if (i18nInstance.resolvedLanguage !== language) {
    i18nInstance.changeLanguage(language);
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};
