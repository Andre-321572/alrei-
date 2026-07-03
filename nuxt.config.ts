// https://nuxt.com/docs/api/configuration/nuxt-config

const NON_DEFAULT_LOCALES = ['en', 'pt']
const DYNAMIC_ROUTES = ['/instructor-detail', '/course-detail']

const routeRules = Object.fromEntries(
  DYNAMIC_ROUTES.flatMap(path => [
    [`${path}/**`, { prerender: false }],
    ...NON_DEFAULT_LOCALES.map(locale => [`/${locale}${path}/**`, { prerender: false }]),
  ])
)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
  future: {
    compatibilityVersion: 4
  },

  nitro: {
    preset: 'static',
    prerender: {
      failOnError: true,
      crawlLinks: true,
    }
  },

  routeRules,

  devtools: { enabled: false },

  sourcemap: {
    server: false,
    client: false,
  },

  modules: ['@nuxtjs/i18n'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'
    }
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'pt', iso: 'pt-PT', file: 'pt.json', name: 'Português' }
    ],
    defaultLocale: 'fr',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/styles.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  vite: {
    optimizeDeps: {
      include: ['bootstrap', 'vue'],
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
      }
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        maxParallelFileOps: 20
      }
    },
    worker: {
      format: 'es'
    }
  },

  app: {
    head: {
      title: "Alrei - Académie en ligne",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" }
      ]
    }
  }

})
