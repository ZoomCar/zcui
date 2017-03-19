const shell = require('shelljs');
const chalk = require('chalk');

exports.command  = 'page <name>';
exports.desc     = 'create new page';

exports.builder = yargs => {
  return yargs
    .example('$0 create page Home --layout Default')
    .options({
      'layout': {
        alias: 'l',
        demandOption: true,
        describe: 'layout for the page',
        type: 'string'
      }
    });
}

exports.handler = argv => {
  if(argv.layout === '') {
    console.log(chalk.red('Sorry, you need to provide valid non empty layout name.'));
    shell.exit(1);
  }

  if(argv.layout === false) {
    console.log('Without layout');
  }

  console.log('Creating page:');
}

