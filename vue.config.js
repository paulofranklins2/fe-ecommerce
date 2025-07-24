const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/auth': { target: 'http://localhost:8080' },
      '^/product': { target: 'http://localhost:8080' },
      '^/category': { target: 'http://localhost:8080' },
      '^/cart': { target: 'http://localhost:8080' },
      '^/order': { target: 'http://localhost:8080' }
    },
    historyApiFallback: true
  }
})