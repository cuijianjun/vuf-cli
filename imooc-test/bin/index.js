#!/usr/bin/env node

const { arguments } = require('commander');
const commander = require('commander')
const pkg = require('../package.json')

// 获取commander的单例
//const {program} = commander;

// 手动实例化一个command实例
const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称');

// command 注册命令
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository')
  .option('-f, --force', '是否强制克隆')
  .action((source, destination, cmdObj) => {
    console.log("do clone");
    console.log(source, destination, cmdObj.force);
  })
// addCommand 注册子命令
const service = new commander.Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log("do service start", port);
  })

service
  .command('stop')
  .description('stop service')
  .action(() => {
    console.log("stop service");
  })
  
program.addCommand(service)

program
  .command('install [name]', 'install package', {
    executableFile: 'imooc-cli',
    isDefault: true,
    hidden: true
  })
  .alias('i')

  program
  .arguments('<cmd> [options]')
  .description('test command', {
    cmd: 'command to run',
    options: 'options for command'
  })
  .action(function(cmd, options) {
    console.log(cmd, options);
  })


program
  .parse(process.argv);

