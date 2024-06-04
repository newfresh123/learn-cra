#! /usr/bin/env node //使用 node 进行脚本的解释程序。
//开启子进程
const spawn = require('cross-spawn')
const args = process.argv.slice(2) //获取命令行参数 build
const scripts = args[0]
debugger
spawn.sync(
  process.execPath, //node执行路径
  [require.resolve('../scripts/' + scripts)],
  {stdio: 'inherit'} //父进程和子进程共享标准输入输出
)
