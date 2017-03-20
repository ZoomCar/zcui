const chalk = require('chalk');

module.exports = process.platform === 'win32' ? {
  info    : chalk.blue('i'),
  success : chalk.green('√'),
  warning : chalk.yellow('‼'),
  error   : chalk.red('×')
} : {
  info    : chalk.blue('ℹ'),
  success : chalk.green('✔'),
  warning : chalk.yellow('⚠'),
  error   : chalk.red('✖')
};

