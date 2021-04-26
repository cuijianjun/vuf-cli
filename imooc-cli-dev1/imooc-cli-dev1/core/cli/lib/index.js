'use strict';

module.exports = core;

const path = require('path')
const userHome = require('user-home')
const pathExists = require('path-exists').sync;
const semver = require('semver')
const colors = require('colors/safe')
const pkg = require('../package.json')
const commander = require('commander')
const log = require("@imooc-cli-dev1/log")
const constant = require('./const')

let args, config;

const program = new commander.Command();

async function core() {
    try {
        checkPkgVersion();
        checkNodeVersion();
        checkRoot();
        checkUserHome();
        // checkInputArgs()
        checkEnv()
        await checkGlobalUpdate()
        registerCommand()
    } catch (e) {
        log.error(e.message)
    }
}

function registerCommand() {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开始调试模式', false);
    
    program.on('option:debug', function() {
        // console.log(process.env.LOG_LEVEL);
        const options = program.opts();
        console.log(options.debug);
        if(options.debug) {
            process.env.LOG_LEVEL = 'verbose';
        } else {
            process.env.LOG_LEVEL = 'info';
        }
        log.level = process.env.LOG_LEVEL
        log.verbose('test')
    });
    program.parse(process.argv);
}


async function checkGlobalUpdate() {
    // 1. 获取当前版本号和模块名
    const currentVersion = pkg.version;
    const npmName = pkg.name;
    // 2. 调用npm API，获取所有版本号
    const {getNpmSemverVersion} = require('@imooc-cli-dev1/get-npm-info')
    const lastVersion = await getNpmSemverVersion(currentVersion, npmName)
    if (lastVersion && semver.gt(lastVersion, currentVersion)) {
        log.warn('更新提示',colors.yellow(`请手动更新 ${npmName}
当前版本： ${currentVersion},
最新版本： ${lastVersion}
更新命令: npm install -g ${npmName}
        `))
    }
    // 3. 提取所有版本号，比对那些版本号是大于当前版本号
    // 4. 获取最新的版本号，提示用户更新到该版本
    
}

function checkInputArgs() {
    const minimist = require('minimist')
    args = minimist(process.argv.slice(2))
    checkArgs(args)
}

function checkEnv() {
    const dotenv = require('dotenv')
    const dotenvPath = path.resolve(userHome, '.env');
    if (pathExists(dotenvPath)) {
        config = dotenv.config({
            path: dotenvPath
        })
    }
    // config = dotenv.config({
    //     path: path.resolve(userHome,'.env')
    // });
    createDefaultConfig()
    log.verbose('环境变量', process.env.CLI_HOME_PATH)
}

function createDefaultConfig() {
    const cliConfig = {
        home: userHome
    }
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
    } else {
        cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH = cliConfig['cliHome']
    // return cliConfig
}

function checkArgs() {
    if (args.debug) {
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
    // console.log(process.version);
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