const tap = require('tap');
const test = tap.test;
const logSymbols = require('../../helpers/log-symbols');

test("log-symbol: get logs object", t => {
  if(process.platform == 'win32') {
    t.equal(logSymbols.info, 'i');
    t.equal(logSymbols.success, '√');
    t.equal(logSymbols.warning, '‼');
    t.equal(logSymbols.error, '×');
  } else {
    t.equal(logSymbols.info, 'ℹ');
    t.equal(logSymbols.success, '✔');
    t.equal(logSymbols.warning, '⚠');
    t.equal(logSymbols.error, '✖');
  }
  t.end();
});

