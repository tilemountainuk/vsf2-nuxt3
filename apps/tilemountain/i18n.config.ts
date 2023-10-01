export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  langDir: 'lang',
  locales: [
    { code: 'en', file: 'en.json' }
  ],
  lazy: true,
  defaultLocale: 'en'
}))
