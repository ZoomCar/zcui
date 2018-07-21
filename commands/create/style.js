const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const changeCase = require('change-case');
const shell = require('shelljs');
const {evalTemplate} = require('../../helpers/template');
const logSymbols = require('../../helpers/log-symbols.js');
const {getProjectRoot} = require('../../helpers');

const PWD = getProjectRoot();

const AppConfig = require(path.join(PWD, '.zcui/config.js'));

exports.command  = 'style <name>';
exports.desc     = 'create new style';

exports.builder = yargs => {
  return yargs.example('$0 create style button');
};

exports.handler = argv => {
  const name = {
    default: argv.name,
    param  : changeCase.paramCase(argv.name),
    pascal : changeCase.pascalCase(argv.name),
    camel  : changeCase.camelCase(argv.name)
  };

  const styleDir = path.join(PWD, AppConfig.path.styles, 'partials');
  if(!shell.test('-d', styleDir)) shell.mkdir('-p', styleDir);

  const filePath = path.join(styleDir, `_${name.param}.scss`);
  if (shell.test('-e', filePath)) {
    console.log(`${logSymbols.error} ${name.param} style already exits! Please choose some another name!!!`);
    shell.exit(1);
  }

  const zcuiDir = path.join(PWD, '.zcui');
  const tplDir = path.resolve(zcuiDir, 'templates/create/style');
  const tplFilePath = path.resolve(tplDir, '_style.scss.tpl');

  const tplFileContent = fs.readFileSync(tplFilePath, 'utf8');

  fs.writeFileSync(filePath, evalTemplate(`\`${tplFileContent}\``, {name}));

  /**
   * Update style/partials/index.scss with
   * all partials import
   **/
  const scssFileRegx = /(\.scss)$/;
  const partialToImport = shell.ls(styleDir).filter(styleFile => {
    return !(styleFile == '_index.scss' || !scssFileRegx.test(styleFile));
  }).map(styleFile => {
    return styleFile.replace(/^_/, '').replace(scssFileRegx, '');
  });

  const importStr = partialToImport.map(m => {
    return `@import './${m}';`;
  }).join("\n");

  const indexPath = path.resolve(styleDir, `_index.scss`);
  const indexContent = `${importStr}\n\n`;
  fs.writeFileSync(indexPath, indexContent);

  console.log(logSymbols.success, `${chalk.bold(name.param)} Style _partial created`);
};

