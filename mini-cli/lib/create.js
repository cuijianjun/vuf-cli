const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const PromptModuleAPI = require('./PromptModuleAPI')
const Creator = require('./Creator')
const Generator = require('./Generator')
const clearConsole = require('./utils/clearConsole')
const executeCommand = require('./utils/executeCommand')
const chalk = require('chalk')

async function create(name) {
    const creator = new Creator()
    // 获取各个模块的交互提示语
    const promptModules = getPromptModules()
    const promptAPI = new PromptModuleAPI(creator)
    promptModules.forEach(m => m(promptAPI))
    const targetDir = path.join(process.cwd(), name)

    // 如果目标目录已存在，询问是覆盖还是合并
    if (fs.existsSync(targetDir)) {
        // 清空控制台
        clearConsole()
        const {action} = await inquirer.prompt([{
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
                {name: 'Overwrite', value: 'overwrite'},
                {name: 'Merge', value: 'merge'}
            ]
        }])

        if (action === 'overwrite') {
            console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
            await fs.remove(targetDir)
        }
    }

    // 弹出交互提示语并获取用户的选择
    const answers = await inquirer.prompt(creator.getFinalPrompts())
    console.log("answers", answers);
    // package.json 文件内容
    const pkg = {
        name,
        version: '0.1.0',
        dependencies: {},
        devDependencies: {},
    }

    const generator = new Generator(pkg, path.join(process.cwd(), name))
    // 填入 vue webpack 必选项，无需用户选择
    answers.features.unshift('vue', 'webpack')

    // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
    // 并且将对应的 template 模块渲染
    answers.features.forEach(feature => {
        require(`./generator/${feature}`)(generator, answers)
    })

    await generator.generate()

    console.log('\n正在下载依赖...\n')
    // 下载依赖
    console.log("path", path.join(process.cwd(), name));
    await executeCommand('npm install', path.join(process.cwd(), name))
    
    console.log('\n依赖下载完成! 执行下列命令开始开发：\n')
    console.log(`cd ${name}`)
    console.log(`npm run dev`)
}

function getPromptModules() {
    return [
        'babel',
        'router',
        'vuex',
        'linter',
    ].map(file => require(`./promptModules/${file}`))
}

module.exports = create