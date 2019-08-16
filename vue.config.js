module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  outputDir: 'dist',
  pwa: {
    name: 'diplay',
    themeColor: '#34314b',
    msTileColor: '#34314b',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',

    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp(".*(?:googleapis).com.*$"),
          handler: "cacheFirst"
        }
      ]
    }
  }
};
