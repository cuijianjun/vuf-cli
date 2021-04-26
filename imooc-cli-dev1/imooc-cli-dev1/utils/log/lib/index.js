'use strict';

const log = require('npmlog')

log.level = process.env.LOG_LEVEL? process.env.LOG_LEVEL: 'info';// 判断debug模式

log.heading = 'Frank' // 修改前端
// log.headingStyle= {bg: 'green'}
log.addLevel('success', 2000, {fg: 'green', bg: true}) // 添加自定义指令

module.exports = log