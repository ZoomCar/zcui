const shell = require('shelljs');

exports.command    = 'create <type>';
exports.aliases    = ['generate', 'c', 'g'];
exports.desc       = 'Create new component/page/layout etc';

exports.builder = yargs => {
  return yargs
    .example('$0 create component Calendar')
    .example('$0 create page Home --layout Default')
    .example('etc...')
    .commandDir('./create');
};

