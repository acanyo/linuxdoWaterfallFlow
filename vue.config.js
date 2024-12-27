const { defineConfig } = require('@vue/cli-service')

/**
 * Vue CLI 配置文件
 */
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
