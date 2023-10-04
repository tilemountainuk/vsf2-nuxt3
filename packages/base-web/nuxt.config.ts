// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  debug: false,
  alias: {
    '@base': resolve(__dirname, './')
  },
  components: [
    { path: '@base/dynamic_pages', pathPrefix: false }
  ],
  typescript: {
    typeCheck: true
  },
  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en.json'
          }
        ],
        lazy: false,
        langDir: 'lang',
        defaultLocale: 'en'
      }
    ]
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      'acceptHMRUpdate'
    ]
  },
  imports: {
    dirs: ['stores', '@base/stores']
  },
  device: {
    defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36',
    refreshOnResize: true
  },
  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'VSF x Nuxt3 (Boilerplate)' },
        { name: 'theme-color', content: '#018937' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-180x180.png' }
      ]
    }
  },
  appConfig: {
    titleSuffix: 'Tile Mountain App'
  },
  runtimeConfig: {
    public: {
      rootDir: __dirname,
      baseDir: __dirname
    }
  },
  image: {
    screens: {
      '4xl': 1920,
      '3xl': 1536,
      '2xl': 1366,
      xl: 1280,
      lg: 1024,
      md: 768,
      sm: 640,
      xs: 376,
      '2xs': 360
    },
    provider: process.env.NUXT_IMAGE_PROVIDER || 'ipx'
  }
});
