const fs = require('fs');
const path = require('path');
const changeCase = require('change-case');
const shell = require('shelljs');
const chalk = require('chalk');
const {evalTemplate} = require('../../helpers/template');
const logSymbols = require('../../helpers/log-symbols.js');
const {getProjectRoot} = require('../../helpers');

const PWD = getProjectRoot();

const AppConfig = require(path.join(PWD, '.zcui/config.js'));

exports.command  = 'helper <name>';
exports.desc     = 'create new helper';

exports.builder = yargs => {
  return yargs.example('$0 create helper Date');
};

exports.handler = argv => {
  const zcuiDir = path.join(PWD, '.zcui');
  const name = {
    default: argv.name,
    param  : changeCase.paramCase(argv.name),
    pascal : changeCase.pascalCase(argv.name),
    camel  : changeCase.camelCase(argv.name)
  };

  const helperDir = path.join(PWD, AppConfig.path.helpers);
  if(!shell.test('-d', helperDir)) shell.mkdir('-p', helperDir);

  const specDir = path.join(helperDir, '__tests__');
  if(!shell.test('-d', specDir)) shell.mkdir('-p', specDir);

  const filePath = path.join(helperDir, `${name.param}.js`);
  const specPath = path.join(specDir, `${name.param}.spec.js`);
  if (shell.test('-e', filePath)) {
    console.log(`${logSymbols.error} ${name.param} helper already exits! Please choose some another name!!!`);
    shell.exit(1);
  }

  const tplDir = path.resolve(zcuiDir, 'templates/create/helper');
  // const tplDir = path.resolve(__dirname, '../..', 'templates/create/helper');
  const tplFilePath = path.resolve(tplDir, 'helper.js.tpl');
  const tplSpecPath = path.resolve(tplDir, 'helper.spec.js.tpl');

  const tplFileContent = fs.readFileSync(tplFilePath, 'utf8');
  const tplSpecContent = fs.readFileSync(tplSpecPath, 'utf8');

  fs.writeFileSync(filePath, evalTemplate(`\`${tplFileContent}\``, {name}));
  fs.writeFileSync(specPath, evalTemplate(`\`${tplSpecContent}\``, {name}));

  console.log(logSymbols.success, `${chalk.bold(name.param)} Helper created`);
  console.log(`
  ${chalk.underline.dim('Use:')}
  import ${chalk.bold(name.camel)} from '${chalk.bold(`~/helpers/${name.param}`)}';
  `);
};

