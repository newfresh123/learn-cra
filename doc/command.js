const chalk = require('chalk');
const { Command } = require('commander');
console.log('process.argv:', process.argv);
let program = new Command('create-react-app');
program
  .version('0.1.0') // 设置版本号
  .arguments('<must1> <must2> [optional1] [optional2]') // 设置参数 <>表示必选 []表示可选
  .usage(`${chalk.green('<must1>')} ${chalk.green('<must2>')} ${chalk.blue('[optional1]')} ${chalk.blue('[optional2]')}`)
  .action((must1, must2, optional1, optional2) => {
    console.log('must1:', must1);
    console.log('must2:', must2);
    console.log('optional1:', optional1);
    console.log('optional2:', optional2);
  })// 设置命令行参数的处理函数
  .parse(process.argv); // 从process.argv中解析出命令行参数
