process.env.NODE_ENV = 'production'
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const configFactory = require('../config/webpack.config') //获取webpack配置文件
const config = configFactory('production') //获取生产环境配置
const paths = require('../config/paths')

//清空输出目录
fs.emptyDirSync(paths.appBuild)
//拷贝public目录到输出目录
copyPublicFolder()
build()

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}

function build() {
  let compiler = webpack(config)
  compiler.run((err, stats) => {
    if (err) {
      console.log(chalk.red('编译失败'))
      console.log(err.message || err)
      process.exit(1)
    }
    if (stats.compilation.errors.length) {
      console.log(chalk.red('编译失败'))
      console.log(stats.toString({colors: true}))
      process.exit(1)
    }
    console.log(chalk.green('编译成功'))
  })
}
