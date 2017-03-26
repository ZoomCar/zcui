const shell = require('shelljs');
const changeCase = require('change-case');
const fs = require('fs');
const path = require('path');
const {evalTemplate} = require('../../helpers/template');
const logSymbols = require('../../helpers/log-symbols.js');
const {getProjectRoot} = require('../../helpers');

exports.command  = 'component <name>';
exports.desc     = 'create new component';

exports.builder = yargs => {
  return yargs.example('$0 create component zc-calendar');
};

exports.handler = argv => {
  const pwd = getProjectRoot();
  const componentsDir = path.join(pwd, 'src/components');

  if (!shell.test('-d', componentsDir)) {
    shell.mkdir('-p', componentsDir);
  }

  const name = {
    default: argv.name,
    param  : changeCase.paramCase(argv.name),
    pascal : changeCase.pascalCase(argv.name),
    camel  : changeCase.camelCase(argv.name)
  };

  const componentPath = path.join(componentsDir, name.param);
  if (shell.test('-d', componentPath)) {
    console.log(`${logSymbols.error} ${name.param} component already exits! Please choose some another name!!!`);
    shell.exit(1);
  }
  shell.mkdir('-p', componentPath);

  const templateDir = path.resolve(__dirname, '../..', 'templates/create/component');
  shell.ls(templateDir).forEach(tpl => {
    const fileName = tpl.replace(/^(component)/, name.param).replace(/(\.tpl)$/, '');
    const tplPath = path.resolve(templateDir, tpl);
    const filePath = path.join(componentPath, fileName);

    const tplContent = fs.readFileSync(tplPath, 'utf8');
    const fileContent = evalTemplate(`\`${tplContent}\``, {name});

    fs.writeFileSync(filePath, fileContent);
  });

  console.log(logSymbols.success, ` ${name.param} Component created`);
};

