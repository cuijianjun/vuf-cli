'use strict';
const path = require('path')
const pkgDir = require('pkg-dir').sync;
const pathExists = require('path-exists').sync;
const npminstall = require('npminstall');
const { isObject } = require('@imooc-cli-dev1/utils');
const formatPath = require('@imooc-cli-dev1/format-path');
const { getDefaultRegistry, getNpmLatestVersion } = require('@imooc-cli-dev1/get-npm-info');

class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package类的options参数不能为空！');
        }
        if (!isObject(options)) {
            throw new Error('Package类的options参数必须为对象！');
        }
        // package的路径
        this.targetPath = options.targetPath;
        // // package的存储路径
        // this.storePath = options.storePath;
        // 缓存package的路径
        this.storeDir = options.storeDir
        // package的name
        this.packageName = options.packageName;
        // package的version
        this.packageVersion = options.packageVersion;
    }

    async prepare() {
        if (this.packageVersion === 'latest') {
            this.packageVersion = await getNpmLatestVersion(this.packageName);
          }
    }

    // 判断当前的package是否存在
    async exists() {
        if (this.storeDir) {
            await this.prepare();
        } else {
            return pathExists(this.targetPath);
        }
    }
    // 安装package
    install() {
        npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: getDefaultRegistry(),
            pkgs: [
                {
                    name: this.packageName,
                    version: this.packageVersion
                }
            ]
        })
    }
    // 更新package
    update() { }
    // 获取入口文件的路径
    getRootFilePath() {
        // 1. 获取package.json所在的目录 -- pkg-dir
        const dir = pkgDir(this.targetPath);
        if (dir) {
            // 2. 读取package.json -- require()Î
            const pkgFile = require(path.resolve(dir, 'package.json'));
            console.log(pkgFile);
            // 3. 寻找main/lib --path
            if (pkgFile && pkgFile.main) {
                // 4. 路径的兼容（macos/windows）
                return formatPath(path.resolve(dir, pkgFile.main));
            }

        }
        return null;
    }
}
module.exports = Package;