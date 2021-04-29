'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const glob = require('glob');
const ejs = require('ejs');
const semver = require('semver');
const userHome = require('user-home');
const Command = require('@imooc-cli-dev/command');
const Package = require('@imooc-cli-dev/package');
const log = require('@imooc-cli-dev/log');
const { spinnerStart, sleep, execAsync } = require('@imooc-cli-dev/utils');
class InitCommand extends Command {
    init() {
        this.projectName = this._argv[0] || '';
        this.force = !!this._cmd.force;
        log.verbose('projectName', this.projectName);
        log.verbose('force', this.force);
    }
    exec() {
        console.log('exec');
    }
}

function init(argv) {
    // console.log("init", programName, cmdObj.force, process.env.CLI_TARGET_PATH);
    return new InitCommand(argv);
}


module.exports = init;
module.exports.InitCommand = InitCommand