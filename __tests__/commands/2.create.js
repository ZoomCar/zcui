const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../index.js')} create`;
const testProjPath = path.resolve(__dirname, '../../temp/test-proj');

test("shows error on create command outside zcui project", t => {
  shell.cd(path.join(testProjPath));
  shell.exec(`${zcui} --help`, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail();
    t.equal(stderr.trim(), '✖ Not a zcui project');
    t.end();
  });
});

test("shows help on create --help", t => {
  shell.cd(path.join(testProjPath, 'hello-world'));

  shell.exec(`${zcui} --help`, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `index.js create <type>

Create new component/page/layout etc

Commands:
  index.js create component <name>  create new component
  index.js create helper <name>     create new helper
  index.js create layout <name>     create new layout
  index.js create page <name>       create new page
  index.js create store <name>      create new store
  index.js create style <name>      create new style

App Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  index.js create component Calendar
  index.js create page Home --layout Default
  etc...`);
    t.end();
  });

});

