process.env.NODE_ENV = 'development';
//配置文件工厂
const configFactory = require('../config/webpack.config');
const config = configFactory('development');
//webpack编译器
const webpack = require('webpack');
const chalk = require('chalk');
const compiler = webpack(config);
//获取webpack-dev-server的配置
const createDevServerConfig = require('../config/webpackDevServer.config');
const serverConfig = createDevServerConfig();
const WebpackDevServer = require('webpack-dev-server');
/**
 * 1.内部会启动一个compiler的编译
 * 2.启动一个HTTP 并返回编译后的结果
 *
 */
const devServer = new WebpackDevServer( serverConfig, compiler);
devServer.startCallback(() => {
  console.log(chalk.cyan('Starting the development server...\n'));
});
