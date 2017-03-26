const path     = require('path');
const fs       = require('fs');
const shell    = require('shelljs');
const findRoot = require('find-root');

module.exports = {
  getProjectRoot() {
    let projectRoot = null;
    try{
      projectRoot = findRoot(shell.pwd().toString());
    } catch(e) {
      // TODO: handle exception
      return null;
    }

    if(!projectRoot) return null;

    /*
     * Check if project has package.json and
     * contains zcui and zcui.variant key
     */
    try{
      let pkgFile = path.resolve(projectRoot, 'package.json');
      let pkgContent = fs.readFileSync(pkgFile);
      let pkg = JSON.parse(pkgContent);
      if(!pkg.zcui || !pkg.zcui.variant) {
        return null;
      }
    } catch(e) {
      // TODO: handle exception
      return null;
    }

    return projectRoot;
  }
};

