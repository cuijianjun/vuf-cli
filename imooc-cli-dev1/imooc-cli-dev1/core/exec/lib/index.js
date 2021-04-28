'use strict';
const log = require('@imooc-cli-dev1/log')
const Package = require('@imooc-cli-dev1/package');


const SETTINGS = {
    init: '@imooc-cli/init',
};

function exec() {
    let targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
    log.verbose('targetPath', targetPath);
    log.verbose('targetPath', homePath);

    const cmdObj = arguments[arguments.length - 1];
    const cmdName = cmdObj.name();
    const packageName = SETTINGS[cmdName];
    const packageVersion = 'latest';

    if (!targetPath) {
        // 生成缓存路径
        targetPath = ''
    }

    console.log(cmdObj.name());
    const pkg = new Package({
        targetPath,
        packageName,
        packageVersion,
    })
    console.log(pkg.getRootFilePath());
    // 1. targetPath --> modulePath
    // 2. modulePath --> Package(npm模块)
    // 3. Package.getRootFile (获取入口文件)
    // 4. Package.update / Package.install

    // 封装 --> 复用
}
module.exports = exec;
