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

      Examples:
        zcui create component Calendar
        zcui create layout Default
        zcui create page Home --layout Default

### New project directory structure
    .
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
    │   ├── index.ejs
    │   ├── layouts
    │   │   ├── auth
    │   │   │   ├── auth.js
    │   │   │   ├── auth.scss
    │   │   │   ├── auth.vue
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
    │   │   └── index.js
    │   └── styles
    │       └── style.scss
    ├── webpack.config.js
    └── yarn.lock

