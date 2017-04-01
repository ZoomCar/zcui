const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcui = `node ${path.join(__dirname, '../index.js')}`;

test("shows help on --help", function(t) {
  shell.exec(`${zcui} --help`, {silent:true}, (code, stdout, stderr) => {
    if(code !== 0) t.fail(`code === ${code}.  `, stderr);
    t.equal(stdout, `Usage: index.js <command> [options]

Commands:
  new <app>      Initialize new app                           [aliases: n, init]
  create <type>  Create new component/page/layout etc  [aliases: generate, c, g]

App Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  index.js new HelloWorld
  index.js create component Calendar

for more information, find our manual at https://zoomcar.github.io/zcui/

`);
    t.end();
  });
});

/*test("which zcui", t => {
  shell.exec('zcui -h', {silent: true}, (code, stdout, stderr) => {
    console.log("code ===");
    console.log(stdout);
  });
});*/

