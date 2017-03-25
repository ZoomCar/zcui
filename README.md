[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM version](http://img.shields.io/npm/v/zcui.svg?style=flat-square)](https://www.npmjs.org/package/zcui)
[![NPM license](http://img.shields.io/npm/l/zcui.svg?style=flat-square)](https://github.com/ZoomCar/zcui/blob/master/LICENSE)
[![issues](https://img.shields.io/github/issues/zoomcar/zcui.svg?style=flat-square)](https://github.com/ZoomCar/zcui/issues)
[![Dependencies](https://david-dm.org/zoomcar/zcui/status.svg?style=flat-square)](https://david-dm.org/zoomcar/zcui)
---

### Installation
npm: `npm install -g zcui`<br>
yarn: `yarn global add zcui`


### Common commands


    $ zcui
    ------
      Commands:
        new <app>      Initialize new app                           [aliases: n, init]
        create <type>  Create new component/page/layout etc  [aliases: generate, c, g]
    
      Examples:
        zcui new HelloWorld
        zcui create component Calendar


    $ zcui new <app>
    ------------------
      Options:
        --target, -t   target template name       [string] [required] [choices: "vue"]

      Examples:
        zcui new HelloWorld --target vue


    $ zcui create <type>
    ---------------------
      Commands:
        component <name>  create new component
        layout <name>     create new layout
        page <name>       create new page
        helper <name>     create new helper
        store <name>      create new store module
        style <name>      create new Style partial

      Examples:
        zcui create component Calendar
        zcui create layout Default
        zcui create page Home --layout Default
        zcui create helper date
        zcui create store user
        zcui create style button


### New project directory structure
    ├── flow-typed
    │   ├── vue.js
    │   └── vuex.js
    ├── package.json
    ├── public
    │   ├── build
    │   └── service-worker.js
    ├── src
    │   ├── app
    │   │   ├── app.js
    │   │   ├── app.scss
    │   │   ├── app.vue
    │   │   └── index.js
    │   ├── components
    │   │   ├── zc-calendar
    │   │   │   ├── index.js
    │   │   │   ├── zc-calendar.js
    │   │   │   ├── zc-calendar.scss
    │   │   │   └── zc-calendar.vue
    │   │   └── zc-timepicker
    │   │       ├── index.js
    │   │       ├── zc-timepicker.js
    │   │       ├── zc-timepicker.scss
    │   │       └── zc-timepicker.vue
    │   ├── helpers
    │   │   ├── __tests__
    │   │   │   └── date.spec.js
    │   │   └── date.js
    │   ├── index.ejs
    │   ├── layouts
    │   │   ├── auto
    │   │   │   ├── auto.js
    │   │   │   ├── auto.scss
    │   │   │   ├── auto.vue
    │   │   │   └── index.js
    │   │   └── default
    │   │       ├── default.js
    │   │       ├── default.scss
    │   │       ├── default.vue
    │   │       └── index.js
    │   ├── main.js
    │   ├── pages
    │   │   ├── home
    │   │   │   ├── home.js
    │   │   │   ├── home.scss
    │   │   │   ├── home.vue
    │   │   │   └── index.js
    │   │   └── login
    │   │       ├── index.js
    │   │       ├── login.js
    │   │       ├── login.scss
    │   │       └── login.vue
    │   ├── store
    │   │   ├── index.js
    │   │   └── modules
    │   │       ├── __tests__
    │   │       │   └── hello.spec.js
    │   │       ├── hello.js
    │   │       └── index.js
    │   └── styles
    │       └── style.scss
    ├── webpack.config.js
    └── yarn.lock

