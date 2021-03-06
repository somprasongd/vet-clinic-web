import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  router: {
    base: process.env.BASE_URL || '',
    middleware: ['auth'],
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: 'Vet Clinic V.' + process.env.npm_package_version,
    title: 'VetClinic',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      },
      { rel: 'apple-touch-icon', href: '/icon.png' },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/fonts/kanit.css', '~/assets/css/stylesheet.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/vue-shortkey.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // moment
  moment: {
    defaultTimezone: 'Thailand/Bangkok',
    timezone: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'nuxt-socket-io',
  ],
  io: {
    sockets: [
      {
        url: 'http://localhost:9898', // IO server lives here
      },
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URI || '',
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/
   */
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/queue',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: (process.env.API_URI || '') + '/api/auth/',
            method: 'post',
            propertyName: 'accessToken',
          },
          logout: false,
          user: {
            url: (process.env.API_URI || '') + '/api/users/me/',
            method: 'get',
            propertyName: '',
          },
        },
        tokenRequired: true,
        // tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },
  /*
   ** PWA module configuration
   ** See https://pwa.nuxtjs.org/
   */
  pwa: {
    icon: {
      fileName: 'icon512.png',
      sizes: [36, 48, 72, 96, 144, 192, 256, 384, 512],
      purpose: 'maskable any',
    },
    meta: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: '#49c0e8b6',
      name: 'VetClinic',
      author: 'Poom',
      theme_color: 'rgba(73, 192, 232, 0.39)',
      lang: 'th',
    },
    manifest: {
      name: 'Vet Clinic',
      short_name: 'Vet Clinic',
      display: 'standalone',
      background_color: '#49bfe8',
      theme_color: 'rgba(73, 192, 232, 0.39)',
      lang: 'th',
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          cusblue: '#49bfe8',
          cusblue1: '#b3d9ea',
          cusblue2: '#148cad',
          cusblue3: '#83c2d9',
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vue-shortkey'],
  },
  loading: {
    color: 'white',
    height: '2px',
  },
  generate: {
    fallback: true,
  },
  // serverMiddleware: [
  //   {
  //     path: '/api',
  //     handler: '~/api/index.js',
  //   },
  // ],
  env: {
    version: process.env.npm_package_version,
    apiUrl: process.env.API_URI || '',
    pollingQueueDelay: process.env.POLLING_QUEUE_DELAY || 30000,
  },
}
