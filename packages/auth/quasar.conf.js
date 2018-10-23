// environment config.
require('dotenv').config()

// Configuration for your app
module.exports = function (ctx) {
  return {
    preFetch: true,
    supportIE: false,
    css: ['app.styl'],
    // app plugins (/src/plugins)
    extras: ['roboto-font', 'mdi'],
    plugins: [
      'i18n',
      'axios'
    ],
    build: {
      env: {
        UTOPIAN_API: process.env.UTOPIAN_API,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        STEEMCONNECT_CLIENT_ID: (process.env.STEEMCONNECT_CLIENT_ID || '"utopian.signin"'),
        STEEM_API: (process.env.STEEM_API_DEV || '"https://api.steemit.com"')
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      useNotifier: false,

      extendWebpack (cfg) {
        // main loader / js config.
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
      }
    },
    // dev server configuration.
    devServer: {
      port: 8081,
      open: false // no auto browser.
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: true
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    starterKit: '1.0.2'
  }
}
