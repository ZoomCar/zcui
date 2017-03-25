#!/usr/bin/env node

const m          = require('motivation');
const yargs      = require('yargs');
const chalk      = require('chalk');
const wrap       = require('word-wrap');

const {text, author} = m.get() || {};
if(text && author) console.log(`${chalk.green.dim(wrap(text, {width: 80, indent: '  '}))}
  [${chalk.blue.dim(author)}]
`);

yargs
  .usage('Usage: $0 <command> [options]')
  .example('$0 new HelloWorld')
  .example('$0 create component Calendar')
  .commandDir('./commands')
  .recommendCommands()
  .demandCommand(1, 'You need at least one command before moving on')
  .showHelpOnFail(false, 'Specify --help for available options')
  .version().alias('v', 'version')
  .help().alias('h', 'help')
  .group(['help', 'version'], 'App Options:')
  .epilogue('for more information, find our manual at https://zoomcar.github.io/zcui/')
  .argv;

// console.log('Data we have: ', argv);

