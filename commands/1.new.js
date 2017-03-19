const shell = require('shelljs');
const chalk = require('chalk');
const spinnerFrame = require('elegant-spinner')();
const logUpdate = require('log-update');
const variants = require('../variants.json');

exports.command  = 'new <app>';
exports.aliases  = ['n', 'init'];
exports.desc     = 'Initialize new app';

exports.builder = yargs => {
  return yargs
    .example('$0 new HelloWorld')
    .options({
      'target': {
        alias: 't',
        demandOption: true,
        describe: 'target template name',
        type: 'string',
        choices: Object.keys(variants)
      }
    });
}

exports.handler = argv => {
  if (!shell.which('git')) {
    console.log(chalk.red('Sorry, this script requires git'));
    shell.exit(1);
  }

  if (argv._.length > 1) {
    console.log(chalk.red('Please give only one argument as a directory name!!!'));
    shell.exit(1);
  }

  if (shell.test('-d', argv.app)) {
    console.log(chalk.red(`${argv.app} directory already exits! Please choose some another name!!!`));
    shell.exit(1);
  }

  const interval = setInterval(() => {
    logUpdate(`Fetching the boilerplate...${chalk.cyan.bold.dim(spinnerFrame())}`);
  }, 50);

  // Pull the corresponding variant into the given folder
  shell.exec(`git clone -b ${variants[argv.target].git.branch} ${variants[argv.target].git.url} ${argv.app}`, code => {
    clearInterval(interval);
    logUpdate.clear();
    if (code !== 0) {
      console.log(chalk.red.bold('Error! Try again'));
      shell.exit(1);
    }

    shell.cd(argv.app);
    shell.rm('-rf', '.git');
    shell.exec('git init');

    console.log(chalk.green.bold('Completed.....You are good to go!'));
  });
  //console.log('Creating dir', argv.app);
}

