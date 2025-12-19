import path from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  dir: {
    pages: 'routes'
  },

  devServer: {
    port: 3001,
  },

  modules: [
    // TODO Research if it is needed for project
    '@nuxt/eslint',
    '@nuxt/icon',
    // TODO Research if it is needed for project
    '@nuxt/image',
    // TODO Research if it is needed for project
    '@nuxt/scripts',
    // TODO Research if it is needed for project
    '@nuxt/test-utils',
    'reka-ui/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  icon: {
    serverBundle: {
      collections: ['mdi'] 
    }
  },


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
    '~shop': path.resolve(__dirname, 'app', 'shop'),
    '~utils': path.resolve(__dirname, 'app', 'utils'),
    '~ui': path.resolve(__dirname, 'app', 'ui')
  }
})