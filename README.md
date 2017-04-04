[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM version](http://img.shields.io/npm/v/zcui.svg?style=flat-square)](https://www.npmjs.org/package/zcui)
[![NPM license](http://img.shields.io/npm/l/zcui.svg?style=flat-square)](https://github.com/ZoomCar/zcui/blob/master/LICENSE)
[![issues](https://img.shields.io/github/issues/zoomcar/zcui.svg?style=flat-square)](https://github.com/ZoomCar/zcui/issues)
[![Dependencies](https://david-dm.org/zoomcar/zcui/status.svg?style=flat-square)](https://david-dm.org/zoomcar/zcui)
[![Travis-ci](https://img.shields.io/travis/ZoomCar/zcui.svg?style=flat-square)](https://travis-ci.org/ZoomCar/zcui)
[![Coverage Status](https://img.shields.io/coveralls/hamidraza/zcui.svg?style=flat-square)](https://coveralls.io/github/hamidraza/zcui?branch=master)
[![CodeClimate](https://img.shields.io/codeclimate/github/ZoomCar/zcui.svg?style=flat-square)](https://codeclimate.com/github/ZoomCar/zcui)
---



# Getting started
### Prerequisites
<br>

#### Node

First, install the latest version of Node.

Node is available for a variety of platforms at nodejs.org. It is important that you not install Node with sudo in order to avoid permission problems. On Unix, [nvm](https://github.com/creationix/nvm) provides a convenient way to do this. On OS X, you can also use [Homebrew](https://brew.sh/). On Windows, [chocolatey](https://chocolatey.org/) is an option.

After the installation is complete, verify that Node is set up correctly by typing the below commands on the command line. Both should output a version number:

```
$ node -v
$ npm -v
```
<br>

#### zcui CLI

Once you’ve installed Node, you’ll need to globally install zcui CLI:

```
$ npm install -g zcui
```
After the installation is complete, verify that zcui is set up correctly by typing the below command on the command line.
```
$ zcui --version
```

---
<br>

### Common commands

``` bash
$ zcui
#------
  # Commands:
    new <app-name>      # Initialize new app                           [aliases: n, init]
    create <type>       # Create new component/page/layout etc  [aliases: generate, c, g]

  # Examples:
    zcui new HelloWorld
    zcui create component Calendar


$ zcui new <app>
#------------------
  # Options:
    --target, -t   # target template name       [string] [required] [choices: "vue"]

  # Examples:
    zcui new HelloWorld --target vue


$ zcui create <type>
#---------------------
  # Commands:
    component <name>  # create new component
    layout <name>     # create new layout
    page <name>       # create new page
    helper <name>     # create new helper
    store <name>      # create new store module
    style <name>      # create new Style partial

  # Examples:
    zcui create component Calendar
    zcui create layout Default
    zcui create page Home --layout Default
    zcui create helper date
    zcui create store user
    zcui create style button
```

---
<br>

### Support Variants / Targets
- [vue](https://github.com/hamidraza/zcui-vue "zcui vue")
- [vue-pwa](https://github.com/hamidraza/zcui-vue-pwa "zcui vue-pwa")

