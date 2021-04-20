#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { epilogue, require } = require('yargs');
const dedent = require('dedent');
const pkg = require('../package.json')
// const arg = hideBin(process.argv);
const argv = process.argv.slice(2)
const context = {
  imoocVersion: pkg.version
}
const cli = yargs(arg);
cli
  .usage("Usage : imooc-test [command] <option>")
  .demandCommand(1, "A command is required")
  .recommendCommands()
  .fail((err, msg) => {
    console.log("err", err);
  })
  .strict()
  .alias("h", "help")
  .alias("v", "version")
  .wrap(cli.terminalWidth())
  .epilogue(dedent`  111
  111`)
  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd'
    }
  })
  .option("registry", {
    type: 'string',
    describe: "Define global registry",
    alias: "r"
  })
  .group(['debug'], "Dev Options:")
  .group(['registry'], 'Extra Options:')
  .command("init [name]", "Do init a project", (yargs) => {
    yargs
      .option("name", {
        type: "string",
        describe: 'name of a project'
      });
  }, (argv) => {
    console.log(argv);
  })
  .command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: 'List local packages',
    builder: (yargs) => {

    },
    handle: (argv) => {
      setTimeout(() => {
        console.log("setTimeout");
      }, 0)
      new Promise((resolve, reject) => {
        let chain = Promise.resolve();
        chain.then(() => console.log("chain1"))
        chain.then(() => console.log("chain2"))
        chain.then(() => console.log("chain3"))
      })
      let chain = Promise.resolve();
      chain.then(() => console.log("chain4"))
      setTimeout
      console.log("end");
    }
  })
  .parse(argv, context)