/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  devServer: {
    // B 端使用 8000 端口
    port: 8000,
    proxy: {
      // '/api': 'http://localhost:3001', // mock
      '/api': 'http://localhost:7001', // local
    },
  },
  webpack: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            antv: {
              name: 'antv-chunk',
              test: /antv/,
              priority: 98,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 97,
            },
          },
        }
      }
      return webpackConfig
    },
  },
}
