const tap = require('tap');
const test = tap.test;
const template = require('../../helpers/template');

test("TEMPLATE_evalTemplate: parse string", t => {
  //const result = template.evalTemplate('"`hello world`"');
  const result = template.evalTemplate("`Hello, ${name}`", {name: "World"});
  t.equal(result, 'Hello, World');
  t.end();
});
