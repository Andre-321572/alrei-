// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
  future: {
    compatibilityVersion: 4
  },

  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false,
      crawlLinks: true,
    }
  },

  // Routes dynamiques rendues côté client uniquement (données venant de l'API)
  routeRules: {
    '/instructor-detail/**': { prerender: false },
    '/product-detail/**': { prerender: false },
    '/course-detail/**': { prerender: false },
    '/en/instructor-detail/**': { prerender: false },
    '/en/product-detail/**': { prerender: false },
    '/en/course-detail/**': { prerender: false },
    '/pt/instructor-detail/**': { prerender: false },
    '/pt/product-detail/**': { prerender: false },
    '/pt/course-detail/**': { prerender: false },
  },

  // Désactiver les devtools pour économiser de la mémoire JS
  devtools: { enabled: false },

  // Optimisation de la mémoire pour les builds et le dev
  sourcemap: {
    server: false,
    client: false,
  },

  modules: ['@nuxtjs/i18n'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://elearningbackend.alrei.org/api'
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
    lazy: true,
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/styles.css',
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
      title: "LearnUp - Plateforme d'Apprentissage",
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
