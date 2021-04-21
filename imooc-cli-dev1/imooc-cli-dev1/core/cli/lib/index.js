'use strict';

module.exports = core;

const semver = require('semver')
const colors = require('colors/safe')
const pkg = require('../package.json')
const log = require("@imooc-cli-dev1/log")
const constant = require('./const')



function core() {
    try {
        checkPkgVersion();
        checkNodeVersion();
    } catch (e) {   
        log.error(e.message)
    }
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
