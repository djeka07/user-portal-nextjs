'use client';
import { useCallback } from 'react';
// eslint-disable-next-line no-restricted-imports
import { UseTranslationOptions, useTranslation as useTranslationOrg } from 'react-i18next';

type UseTranslationReturn = {
  t: (key: string, params?: { [key: string]: string }) => string
  change: (language: string) => void;
}

export const useTranslation = (namespace?: string, options?: UseTranslationOptions<undefined>): UseTranslationReturn => {
  const [, trans] = useTranslationOrg(namespace, options);

  const change = useCallback((language: string) => {
    trans.changeLanguage(language);
  }, [trans]);

  return { t: trans.t, change };
}