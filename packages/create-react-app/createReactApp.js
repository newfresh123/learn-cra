const { Command } = require('commander');
const packageJson = require('./package.json');
const chalk = require('chalk');
const fs = require('fs-extra')
const path = require('path');
const os = require('os');
async function init() {
  let projectName;
  new Command(packageJson.name) // 设置命令名
    .version(packageJson.version) // 设置版本号
    .arguments('<project-directory>') // 设置参数 命令行 npm run create-react-app -- <project-directory>
    .usage(`${chalk.green('<project-directory>')}`)
    .action(name => {
      projectName = name;
    }).parse(process.argv);//[node完整路径, 当前脚本完整路径, ...args]
  console.log('{projectName:', projectName);
  await createApp(projectName);
}
async function createApp(projectName) {
  //1. 创建项目目录
  let root = path.resolve(projectName); // 获取项目目录的绝对路径
  fs.ensureDirSync(projectName); // 确保目录存在
  console.log(`Creating a new React app in ${chalk.green(root)}.`);
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(root, 'package.json'), // 写入package.json
    JSON.stringify(packageJson, null, 2) + os.EOL // 格式化json
  );
  const originalDirectory = process.cwd(); // 获取当前工作目录
  process.chdir(root); // 切换工作目录
  console.log('root', root);
  console.log('originalDirectory', originalDirectory);

}
module.exports = {
  init
}
