import { dir } from 'i18next'
import { ColorModeProvider } from '~/common/models/contexts/color-mode.context'
import StylesSheet from '~/styles/stylesheet'
import { I18nClientProvider } from '../i18n/client/i18n.context'
import { getTranslation } from '../i18n/server'
import { languages } from '../i18n/settings'

type MetadataProps = {
  params: { lng: string }
}

export async function generateMetadata({ params: { lng } }: MetadataProps) {
  const { t } = await getTranslation(lng, 'app')
  return { title: t('app:title') }
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode,
  params: { lng: string }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <ColorModeProvider initial="dark">
        <head>
          <StylesSheet />
        </head>
        <body>
          <I18nClientProvider language={lng}>
            {children}
          </I18nClientProvider>
        </body>
      </ColorModeProvider>
    </html>
  )
}
