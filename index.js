#!/usr/bin/env node

const changeCase = require('change-case');
const m          = require('motivation');
const fs         = require('fs');
const yargs      = require('yargs');
const chalk      = require('chalk');
const wrap       = require('word-wrap');

const {text, author} = m.get() || {};
if(text && author) console.log(`${chalk.green.dim(wrap(text, {width: 80, indent: '  '}))}
  [${chalk.blue.dim(author)}]
`);

var argv = yargs
  .usage('Usage: $0 <command> [options]')
  .example('$0 new HelloWorld')
  .example('$0 create component Calendar')
  .commandDir('./commands')
  .recommendCommands()
  .demandCommand(1, 'You need at least one command before moving on')
  .showHelpOnFail(false, 'Specify --help for available options')
  .version().alias('v', 'version')
  .help().alias('h', 'help')
  .epilogue('for more information, find our manual at http://zcui.zoomcar.com')
  .argv;

// console.log('Data we have: ', argv);

