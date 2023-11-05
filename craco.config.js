module.exports = {
  devServer: {
    // B 端使用 8000 端口
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
