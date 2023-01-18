export default {
    head: {
      titleTemplate: '%s - front-web-deploy',
      title: 'front-web-deploy',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap' },
        { rel: 'stylesheet', href:'https://fonts.googleapis.com/icon?family=Material+Icons' },
        //
        { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
        { rel: 'stylesheet', href:'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
        { rel: 'stylesheet', href:'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css' },
      ],
      script: [
        { src: 'https://static.line-scdn.net/liff/edge/2.1/sdk.js' },
        { src: 'https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js' },
        { src: 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js' }
      ]
    },
    css: [
    ],
    plugins: [
    ],
    components: true,
}