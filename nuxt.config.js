import colors from 'vuetify/es5/util/colors'

export default {
   // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
   ssr: false,
   server: {
      port: 2222, // default: 2222
      host: 'localhost', // default: localhost
   },

   // Global page headers: https://go.nuxtjs.dev/config-head
   head: {
      titleTemplate: '%s - tiger-admin',
      title: 'tiger-admin',
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
   },

   // Global CSS: https://go.nuxtjs.dev/config-css
   css: ['~assets/sass/index.sass'],

   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   plugins: [
      '~plugins/api/axios',
      '~plugins/vue-masonry-css',
      '~plugins/VueTablerIcons.js',
   ],

   // Auto import components: https://go.nuxtjs.dev/config-components
   components: true,
   components: [
      '~components/auth/',
      '~components/structure/',
      '~components/util/',
      '~components/users/',
      '~components/menu/',
   ],

   // https://github.com/nuxt-community/style-resources-module
   styleResources: {
      sass: [
         '~assets/sass/*.sass',
         '~assets/sass/common/*.sass',
         '~assets/sass/utils/*.sass',
         '~assets/sass/custom/*.sass',
         '~assets/sass/override/*.sass',
      ],
   },
   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
   buildModules: [
      // https://go.nuxtjs.dev/eslint
      // '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/vuetify
      '@nuxtjs/vuetify',
      '@nuxtjs/style-resources',
   ],

   // Modules: https://go.nuxtjs.dev/config-modules
   modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',
      // https://auth.nuxtjs.org/
      '@nuxtjs/axios',
      '@nuxtjs/auth-next',
      // https://www.npmjs.com/package/nuxt-moment
      'nuxt-moment',
   ],

   // Axios module configuration: https://go.nuxtjs.dev/config-axios
   axios: {
      baseURL: 'http://125.59.218.85:8500/shop',
   },

   // PWA module configuration: https://go.nuxtjs.dev/pwa
   pwa: {
      manifest: {
         lang: 'en',
      },
   },

   // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
   vuetify: {
      customVariables: ['~/assets/sass/variables.scss'],
      // treeShake: true,
      theme: {
         dark: false,
         options: { customProperties: true },
         themes: {
            light: {
               primary: colors.blue.darken2,
               wall: '#fff',
               back: '#f2f5fa',
               accent: colors.grey.darken3,
               secondary: colors.amber.darken3,
               info: colors.teal.lighten1,
               warning: colors.amber.base,
               error: colors.deepOrange.accent4,
               success: colors.green.accent3,
            },
            dark: {
               primary: colors.blue.darken2,
               wall: '#272727',
               back: '#121212',
               accent: colors.grey.darken3,
               secondary: colors.amber.darken3,
               info: colors.teal.lighten1,
               warning: colors.amber.base,
               error: colors.deepOrange.accent4,
               success: colors.green.accent3,
            },
         },
      },
   },

   // Build Configuration: https://go.nuxtjs.dev/config-build
   build: {
      extend(config, ctx) {
         if (ctx.dev && ctx.isClient) {
            config.module.rules.push({
               enforce: 'pre',
               test: /\.(js|vue)$/,
               loader: 'eslint-loader',
               exclude: /(node_modules)/,
               options: {
                  fix: true,
               },
            })
         }
      },
   },
   // router guard
   router: {
      middleware: ['auth'],
   },
   // nuxt auth
   auth: {
      strategies: {
         local: {
            endpoints: {
               login: {
                  url: '/login',
                  method: 'post',
                  propertyName: 'token',
               },
               logout: false,
               // {
               //    url: '/auth/logout',
               //    method: 'post',
               // },
               user: false,
               //  {
               //     url: '/auth/user',
               //     method: 'get',
               //     propertyName: 'data',
               //  },
            },
            tokenRequired: true,
            tokenType: 'Bearer',
            globalToken: true,
            autoFetchUser: true,
         },
      },
      redirect: {
         login: '/auth/sign-in',
         logout: '/auth/sign-in',
         callback: '/callback',
         home: '/',
      },
   },
}
