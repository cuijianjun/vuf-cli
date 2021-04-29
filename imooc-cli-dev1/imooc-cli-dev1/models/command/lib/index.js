'use strict';
const semver = require('semver')
const LOWEST_NODE_VERSION = '12.0.0'
const colors = require('colors/safe')
const log = require('@imooc-cli-dev1/log');
const { isObject } = require('@imooc-cli-dev1/utils')



class Command {
    constructor(argv) {
        // console.log("Command", argv);
        if (!argv) {
            throw new Error('参数不能为空！')
        }
        if (!Array.isArray(argv)) {
            throw new Error('参数必须为数组！')
        }

        if (argv.length < 1) {
            throw new Error('参数列表为空！')
        }

        this._argv = argv;
        let runner = new Promise((resolve, reject) => {
            let chain = Promise.resolve();
            chain = chain.then(() => this.checkNodeVersion());
            chain = chain.then(() => this.initArgs());
            chain = chain.then(() => this.init());
            chain = chain.then(() => this.exec());
            chain.catch(err => {
                log.error(err.message)
            })
        })
    }

    initArgs() {
        this._cmd = this._argv[this._argv.length - 1];
        this._argv = this._argv.slice(0, this._argv.length - 1);
    }

    checkNodeVersion() {
        // 第一步 获取当前的node版本号
        // console.log(process.version);
        const currentVersion = process.version
        const lowestVersion = LOWEST_NODE_VERSION
        // 第二步：比对最新执行要求版本号
        if (!semver.gt(currentVersion, lowestVersion)) {
            throw Error(colors.red(`imooc-cli 需要安装 V${lowestVersion}以上的版本的nodejs`))
        }
    }

    init() {
        throw new Error('init必须实现')
    }

    exec() {
        throw new Error('exec必须实现')
    }
}

module.exports = Command;