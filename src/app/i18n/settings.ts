export const fallbackLng = 'en'
export const languages = [fallbackLng, 'sv']
export const defaultNS = 'login'
export const cookieName = 'i18next'

export const getOptions = (lng = fallbackLng, ns = defaultNS) => (
  {
    debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  });
