const shell = require('shelljs');

exports.command  = 'helper <name>';
exports.desc     = 'create new helper';

exports.builder = yargs => {
  return yargs.example('$0 create helper Date');
}

exports.handler = argv => {
  console.log('create new helper');
}

