import { dir } from 'i18next';
import { ColorModeProvider } from '~/common/models/contexts/color-mode.context';
import StylesSheet from '~/common/styles/stylesheet';
import { I18nClientProvider } from '../i18n/client/i18n.context';
import { getTranslation } from '../i18n/server';
import { languages } from '../i18n/settings';
import { PanelsProvider } from '@djeka07/ui';
import { ReactNode } from 'react';

type RootLayoutProps = {
  params: Promise<{ lng: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: RootLayoutProps) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'app');
  return { title: t('app:title') };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)}>
      <ColorModeProvider initial="dark">
        <head>
          <StylesSheet />
          <link rel="stylesheet" href="https://djeka07ui.azureedge.net/uii/1.0.0-rc-0.30/style.css" />
        </head>
        <body>
          <I18nClientProvider language={lng}>
            <PanelsProvider>{children}</PanelsProvider>
          </I18nClientProvider>
        </body>
      </ColorModeProvider>
    </html>
  );
}
