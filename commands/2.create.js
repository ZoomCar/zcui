const {getProjectRoot} = require('../helpers');
const logSymbols = require('../helpers/log-symbols.js');

exports.command    = 'create <type>';
exports.aliases    = ['generate', 'c', 'g'];
exports.desc       = 'Create new component/page/layout etc';

exports.builder = yargs => {

  let projectRoot = getProjectRoot();
  if(!projectRoot) {
    console.error(`${logSymbols.error} Not a zcui project`);
    yargs.exit(1);
  }

  return yargs
    .example('$0 create component Calendar')
    .example('$0 create page Home --layout Default')
    .example('etc...')
    .commandDir('./create');
};

