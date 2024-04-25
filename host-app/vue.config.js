const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "host-app",
        library: { type: "var", name: "host-app" },
        filename: "remoteEntry.js",
        remotes: {
            remoteVue3App: JSON.stringify("remoteVue3App@http://localhost:6173/assets/remoteEntry.js"),
        }
    })
    ]
  }
})
