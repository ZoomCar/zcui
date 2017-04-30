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
      },
      'dependencies': {
        describe: 'to skip dependencies installation use --no-dependencies',
        type: 'boolean',
        default: true
      }
    });
};

exports.handler = argv => {
  const app = {
    default: argv.app,
    param  : changeCase.paramCase(argv.app),
    pascal : changeCase.pascalCase(argv.app),
    camel  : changeCase.camelCase(argv.app)
  };

  if (!shell.which('git')) {
    console.log(chalk.red('Sorry, this script requires git'));
    process.exit(1);
  }

  if (argv._.length > 1) {
    console.log(chalk.red('Please give only one argument as a directory name!!!'));
    process.exit(1);
  }

  if (shell.test('-d', app.param)) {
    console.log(chalk.red(`${argv.app} directory already exits! Please choose some another name!!!`));
    process.exit(1);
  }

  const spinner = ora({
    text: `Fetching the ${variants[argv.target].name} variant...`,
    spinner: 'dots'
  }).start();


  /**
   * Clone the corresponding variant into the given folder
   **/
  shell.exec(`git clone --depth 1 -b ${variants[argv.target].git.branch} ${variants[argv.target].git.url} ${app.param} -q`, code => {
    if (code !== 0) {
      spinner.fail('Error! Try again');
      shell.exit(1);
    }

    shell.cd(app.param);
    shell.rm('-rf', '.git');
    shell.exec('git init', {silent: true});

    const pwd = shell.pwd();
    const pkgJson = require(path.resolve(pwd.stdout, 'package.json'));
    pkgJson.name = app.param;
    pkgJson.description = '';
    fs.writeFileSync('./package.json', `${JSON.stringify(pkgJson, null, 2)}\n`);
    shell.cp(path.resolve(pwd.stdout, '.env.example'), path.join(pwd.stdout, '.env'));
    shell.mkdir('-p', path.join(pwd.stdout, 'public/build'));

    shell.exec('git add . && git commit -m "zcui: Initial commit"', {silent: true});

    if(argv.dependencies) {
      spinner.text = 'Installing dependencies...';

      shell.exec(`${shell.which('yarn') ? 'yarn':'npm'} install`, {silent: true, async:true}, code => {
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
    } else {
      spinner.succeed(`Completed.....You are good to go!
  Project ${chalk.bold(app.param)} created.

  ${chalk.dim('>_ [RUN]')}
  ${chalk.dim('$')} cd ${app.param}
  ${chalk.dim('$')} npm install   ${chalk.dim('# to install dependencies')}
  ${chalk.dim('$')} npm run dev   ${chalk.dim('# to start dev server')}
  ${chalk.dim('$')} npm run prod  ${chalk.dim('# to build for production')}
      `);
    }
  });
};

