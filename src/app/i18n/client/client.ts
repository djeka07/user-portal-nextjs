'use client';

import { useCallback } from 'react';
// eslint-disable-next-line no-restricted-imports
import { UseTranslationOptions, useTranslation as useTranslationOrg } from 'react-i18next';
import { cookieName } from '../settings';
import { useCookies } from 'react-cookie';

type UseTranslationReturn = {
  t: (key: string, params?: { [key: string]: string }) => string
  language: string;
  change: (language: string) => void;
}

export const useTranslation = (namespace?: string, options?: UseTranslationOptions<undefined>): UseTranslationReturn => {
  const [, trans] = useTranslationOrg(namespace, options);
  const [, setCookie] = useCookies([cookieName]);
  const change = (language: string) => {
    trans.changeLanguage(language);
    setCookie(cookieName, language, { path: '/'})
  };

  return { t: trans.t, change, language: trans.language };
}