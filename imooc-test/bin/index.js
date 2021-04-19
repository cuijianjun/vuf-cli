#!/usr/bin/env node
console.log("hello");
 
//注册一个命令 imooc-test init
const argv = require('process').argv;
const command = argv[2]
const options = argv.slice(3)
let [option,param] = options
option = option.replace('--','') 
console.log(options);
console.log(command);

// 实现参数解析 --version和init --name
if (command.startsWith('--') || command.startsWith('-')) {
  const globalOption = command.replace(/--|-/g, '');
  if (globalOption === 'version' || globalOption === "V") {
    console.log("1.0.0");
  }
}