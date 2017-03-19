const shell = require('shelljs');

exports.command  = 'style <name>';
exports.desc     = 'create new style';

exports.builder = yargs => {
  return yargs.example('$0 create style button');
}

exports.handler = argv => {
  console.log('create new style');
}

