const path     = require('path');
const fs       = require('fs');
const shell    = require('shelljs');
const findRoot = require('find-root');

module.exports = {
  getProjectRoot(pwd = null) {
    let projectRoot = null;
    try{
      projectRoot = findRoot(pwd || shell.pwd().toString());
    } catch(e) {
      // TODO: handle exception
      return null;
    }

    if(!projectRoot) return null;

    /*
     * Check if project has .zcui dir and
     * contains config file
     */
    try{
      const configFile = path.resolve(projectRoot, '.zcui/config.js');
      return fs.existsSync(configFile) ? projectRoot : null;
    } catch(e) {
      // TODO: handle exception
      return null;
    }
  }
};
