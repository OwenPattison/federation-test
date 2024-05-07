const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  publicPath: 'auto',
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      outputModule: true
    },
    target: 'es2020',
    plugins: [
      new ModuleFederationPlugin({
        name: "host-app",
        library: { type: "module" },
        filename: "remoteEntry.js",
        remotes: {
          remoteVue3App: "./remoteVue3App/assets/remoteEntry.js",
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      })
    ]
  }
})
