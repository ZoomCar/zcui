const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const changeCase = require('change-case');
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
  const app = {
    default: argv.app,
    param  : changeCase.paramCase(argv.app),
    pascal : changeCase.pascalCase(argv.app),
    camel  : changeCase.camelCase(argv.app)
  };

  if (!shell.which('git')) {
    console.log(chalk.red('Sorry, this script requires git'));
    shell.exit(1);
  }

  if (argv._.length > 1) {
    console.log(chalk.red('Please give only one argument as a directory name!!!'));
    shell.exit(1);
  }

  if (shell.test('-d', app.param)) {
    console.log(chalk.red(`${argv.app} directory already exits! Please choose some another name!!!`));
    shell.exit(1);
  }

  const spinner = ora({
    text: `Fetching the ${variants[argv.target].name} variant...`,
    spinner: 'dots'
  }).start();


  /**
   * Clone the corresponding variant into the given folder
   **/
  shell.exec(`git clone -b ${variants[argv.target].git.branch} ${variants[argv.target].git.url} ${app.param} -q`, code => {
    if (code !== 0) {
      spinner.fail('Error! Try again');
      shell.exit(1);
    }

    shell.cd(app.param);
    shell.rm('-rf', '.git');
    shell.exec('git init -q');

    const pwd = shell.pwd();
    const package = require(path.resolve(pwd.stdout, 'package.json'));
    package.name = app.param;
    package.description = '';
    fs.writeFileSync('./package.json', `${JSON.stringify(package, null, 2)}\n`);
    shell.cp(path.resolve(pwd.stdout, '.env.example'), path.join(pwd.stdout, '.env'));
    shell.mkdir('-p', path.join(pwd.stdout, 'public/build'));

    spinner.text = 'Installing dependencies...';

    const installStdout = shell.exec(`${shell.which('yarn') ? 'yarn':'npm'} install`, {silent: true, async:true}, (code, stdout, stderr) => {
      if (code !== 0) {
        spinner.fail('Error! Try installing dependencies manually.');
        shell.exit(1);
      }
      spinner.succeed(`Completed.....You are good to go!
  Project ${chalk.bold(app.param)} created.

  ${chalk.dim('>_ [RUN]')}
  ${chalk.dim('$')} cd ${app.param}
  ${chalk.dim('$')} npm run dev   ${chalk.dim('# to start dev server')}
  ${chalk.dim('$')} npm run prod  ${chalk.dim('# to build for production')}
      `);
    }).stdout.on('data', data => {
      spinner.text = data.split("\n")[0];
    });
    /*shell.exec(`${shell.which('yarn') ? 'yarn':'npm'} install`, {silent: true}, (code, stdout, stderr) => {
    });*/
  });
}

