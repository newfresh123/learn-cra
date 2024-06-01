const { Command } = require('commander');
const packageJson = require('./package.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const spawn = require('cross-spawn');
async function init() {
  let projectName;
  new Command(packageJson.name) // 设置命令名
    .version(packageJson.version) // 设置版本号
    .arguments('<project-directory>') // 设置参数 命令行 npm run create-react-app -- <project-directory>
    .usage(`${chalk.green('<project-directory>')}`)
    .action(name => {
      projectName = name;
    })
    .parse(process.argv); //[node完整路径, 当前脚本完整路径, ...args]
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
    private: true
  };
  fs.writeFileSync(
    path.join(root, 'package.json'), // 写入package.json
    JSON.stringify(packageJson, null, 2) + os.EOL // 格式化json
  );
  const originalDirectory = process.cwd(); // 获取当前工作目录
  process.chdir(root); // 切换工作目录
  console.log('root', root);
  console.log('originalDirectory', originalDirectory);
  await run(root, projectName, originalDirectory);
}
/**
 *
 * @param {*} root 创建项目的根目录
 * @param {*} projectName  项目名称
 * @param {*} originalDirectory 当前工作目录
 */
async function run(root, projectName, originalDirectory) {
  let scriptsName = 'react-scripts'; //create生成的代码里，源文件编译，启动服务等都是通过react-scripts来实现的
  let templateName = 'cra-template'; //模板是通过cra-template来实现的
  const allDependencies = ['react', 'react-dom', scriptsName, templateName];
  console.log('Installing packages. This might take a couple of minutes.');
  console.log(`Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan(scriptsName)} ${`with ${chalk.cyan(templateName)}...}`}`);
  await install(root, allDependencies);
  //项目根目录 项目名称 是否显示verbose--》显示详细信息 原始目录 模板名称
  let data = [root, projectName, true, originalDirectory, templateName];
  let source = `
  var init = require('react-scripts/scripts/init.js');
  init.apply(null, JSON.parse(process.argv[1]));
  `;
  await executeNodeScript({ cwd: process.cwd() }, data, source);
  console.log('Done.')
  process.exit(0);
}
async function executeNodeScript({cwd},data,source) {
  return new Promise(resolve => {
    //node可执行文件路径 -e 执行的代码 -- 传递的参数
    const child = spawn(process.execPath, ['-e', source, '--', JSON.stringify(data)], {
      cwd,
      stdio: 'inherit'
    });
    child.on('close', resolve);
  });
}
async function install(root, allDependencies) {
  return new Promise(resolve => {
    const command = 'yarnpkg';
    const args = ['add', '--exact', ...allDependencies, '--cwd', root];
    console.log(command, args);
    const child = spawn(command, args, {
      stdio: 'inherit'
    });
    child.on('close', resolve); //监听子进程的关闭事件
  });
}
module.exports = {
  init
};
