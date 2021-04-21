'use strict';

module.exports = core;

const userHome = require('user-home')
const pathExists = require('path-exists').sync;
const semver = require('semver')
const colors = require('colors/safe')
const pkg = require('../package.json')
const log = require("@imooc-cli-dev1/log")
const constant = require('./const')

let args;

function core() {
    try {
        checkPkgVersion();
        checkNodeVersion();
        checkRoot();
        checkUserHome();
        checkInputArgs()
    } catch (e) {   
        log.error(e.message)
    }
}


function checkInputArgs() {
    const minimist = require('minimist')
    args = minimist(process.argv.slice(2))
    checkArgs(args)
}

function checkArgs() {
    if(args.debug){
        process.env.LOG_LEVEL = 'verbase'
    } else {
        process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
}

function checkUserHome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前登录用户主目录不存在'))
    }
}
function checkRoot() {
    // console.log(process.geteuid());
    // 因为只在这里使用
    const rootCheck = require('root-check');
    rootCheck()
}


function checkNodeVersion() {
    // 第一步 获取当前的node版本号
    console.log(process.version);
    const currentVersion = process.version
    const lowestVersion = constant.LOWEST_NODE_VERSION
    // 第二步：比对最新执行要求版本号
    if (!semver.gt(currentVersion, lowestVersion)) {
        throw Error(colors.red(`imooc-cli 需要安装 V${lowestVersion}以上的版本的nodejs`))
    }
    

}

function checkPkgVersion() {
    log.info('cli', pkg.version)
    // log()
    // console.log('22', log);
}
