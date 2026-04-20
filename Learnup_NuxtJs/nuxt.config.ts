// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' }
    ],
    defaultLocale: 'fr',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    lazy: true,
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/styles.css',
  ],

  vite: {
    optimizeDeps: {
      include: ['bootstrap'],
    }
  },

  app: {
    head: {
      title: "LearnUp - Nuxt Online Course & Education Template",

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
      ],

      link: [
        { rel: "icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css"
        }
      ]
    }
  }

})
