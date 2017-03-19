const shell = require('shelljs');

exports.command  = 'component <name>';
exports.desc     = 'create new component';

exports.builder = yargs => {
  return yargs.example('$0 create component Calendar');
}

exports.handler = argv => {
  console.log('create new component');
}

