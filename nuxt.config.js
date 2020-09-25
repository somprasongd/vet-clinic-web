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
    titleTemplate: 'Vet Clinic | ' + process.env.npm_package_name,
    title: process.env.npm_package_name || 'VetClinic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
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
  plugins: [],
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
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://dev.opensource-technology.com:3030/api/',
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/
   */
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/queue',
      home: '/queue',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/',
            method: 'post',
            propertyName: 'accessToken',
          },
          logout: false,
          user: {
            url: '/users/me/',
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
  build: {},
  loading: {
    color: 'white',
    height: '2px',
  },
  generate: {
    routes: [
      '/setting/hospital',
      '/setting/users',
      '/setting/Chief-Complaint',
      '/setting/Differential-Diagnosis',
      '/setting/History-Ranking',
      '/setting/Physical-Examination',
      '/setting/check',
    ],
  },
  // serverMiddleware: [
  //   {
  //     path: '/api',
  //     handler: '~/api/index.js',
  //   },
  // ],
}
