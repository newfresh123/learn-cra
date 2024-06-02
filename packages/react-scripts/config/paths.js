const path = require('path')
const fs = require('fs-extra')
const appDirectory = fs.realpathSync(process.cwd())
//接受一个相对路径，返回一个绝对路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
module.exports = {
  appBuild: resolveApp('build'), //输出目录 默认dist
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  appPath: resolveApp('.'),
  appBuildPublicPath: '/',
}
