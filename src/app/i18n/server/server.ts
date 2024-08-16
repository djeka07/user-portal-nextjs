import initI18next from "./server-init"

export async function getTranslation(lang: string, namespace: string | undefined = undefined, options: { keyPrefix?: string } = {}) {
  const i18nextInstance = await initI18next(lang, namespace)
  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(namespace) ? namespace[0] : namespace, options.keyPrefix),
    i18n: i18nextInstance
  }
}