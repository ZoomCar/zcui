const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

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

  const spinner = ora(`Fetching the ${variants[argv.target].name} variant...`).start();


  // Clone the corresponding variant into the given folder
  shell.exec(`git clone -b ${variants[argv.target].git.branch} ${variants[argv.target].git.url} ${argv.app} -q`, code => {
    if (code !== 0) {
      spinner.fail('Error! Try again');
      shell.exit(1);
    }

    shell.cd(argv.app);
    shell.rm('-rf', '.git');
    shell.exec('git init -q');

    const pwd = shell.pwd();
    const package = require(path.resolve(pwd.stdout, 'package.json'));
    package.name = argv.app;
    package.description = '';
    fs.writeFileSync('./package.json', `${JSON.stringify(package, null, 2)}\n`);
    shell.cp(path.resolve(pwd.stdout, '.env.example'), path.join(pwd.stdout, '.env'));
    shell.mkdir('-p', path.join(pwd.stdout, 'public/build'));

    spinner.text = 'Installing dependencies...'
    shell.exec(`${shell.which('yarn') ? 'yarn':'npm'} install`, {silent: true}, (code, stdout, stderr) => {
      if (code !== 0) {
        spinner.fail('Error! Try installing dependencies manually.');
        shell.exit(1);
      }
      spinner.succeed("Completed.....You are good to go!");
    });
  });
  //console.log('Creating dir', argv.app);
}

