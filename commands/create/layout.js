const shell = require('shelljs');

exports.command  = 'layout <name>';
exports.desc     = 'create new layout';

exports.builder = yargs => {
  return yargs.example('$0 create layout Primary');
}

exports.handler = argv => {
  console.log('create new layout');
}

