const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
/**
 * 生产webpack配置文件工厂
 * @param {*} webpackEnv 环境信息 development | production
 */
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'
  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    output: {
      path:paths.appBuild
    },
    devServer: {

    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: paths.appSrc,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        inject: true
      })
    ]
  }
}
