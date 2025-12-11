import path from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  dir: {
    pages: 'routes'
  },

  devServer: {
    port: 3002,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'reka-ui/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  experimental: {
    typedPages: true
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ru', language: 'ru-RU' }
    ],
    defaultLocale: 'en',
  },

  alias: {
    '~admina': path.resolve(__dirname, 'app', 'admina'),
    '~shop': path.resolve(__dirname, 'app', 'shop')
  }
})