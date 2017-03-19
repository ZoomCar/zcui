const shell = require('shelljs');

exports.command  = 'store <name>';
exports.desc     = 'create new store';

exports.builder = yargs => {
  return yargs.example('$0 create store User');
}

exports.handler = argv => {
  console.log('create new store');
}

