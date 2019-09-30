# Viewer

## Setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```

## File structure

```text
.
└── editor
└── server (php files for communication with the webserver)
└── public (all assets and config files)
└── src (all the source code)
	└── components (separate components)
		└── model-viewer (the core of three.js model viewer)
		└── ...
	└── utils (helpers)
	└── views (basically pages)
	└── App.vue (main vue component)
```

## Deployment process

### Steps

1. Change .env variables for production (see [Environment setup](#Environment-setup))
2. Build the apps

```text
yarn run build
cd editor
yarn run build
```

3. The `dist` folders are ready for deployment
4. Add php scripts in `server/api/` to the root folder on the webserver

## CSS

### Introduction

Global css that applies to the whole app can be find in `/App.vue`. Other styles in `.vue` files are applied only to the specific component and they are not affecting other component styling (see [Vue scoped css](https://vue-loader.vuejs.org/guide/scoped-css.html)). [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is used heavily to create any layout in the app. Very few components are used from [Vuetify framework](https://vuetifyjs.com). `EM` were used as a relative unit to the currently chosen font size. Horizontal viewport-relative units are used for determining offsets.

### The global styles

The global styles in `/App.vue`

- `#app` main component, apply fonts, fallback bg, font color etc.
- `#nav` fixed navigation, other content is pushed down by the offset relative to the height of the navigation component
- `.custom-layout` can be find in many instances for the horizontal offset
- `.content` container of the app's content with menu height offset
- `.content__page` apply only for 'static' pages like Exhibition, Impressum etc.
- `.content__page-main` wrapper for the main content

### Component styles

Other styles in `.vue` components apply only to specific component and further comments can be find there.

## Adding new language

Adding new language requires addition development.

- In `config.json` every language version is represented by the item in the main array. To add a new language version another second-level array containing information about obects need to be pushed to the first-level array.
- In `Vue.js`, `navigationLanguageItems` needs to be updated with another language item.
- However, because the language change is not registered now in global state, the change is happening inside idividual components. Therefore, some sort of switch statement needs to be implemented across the app to react and switch between selected language or move current selected language to the global store and distribute the state to the components that needs to react to language change

## HTACCESS CONFIG
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [NC,L,QSA]
```

# Editor

## Setup

```
cd editor
yarn install
yarn serve
```

### Start the PHP webserver

```
cd server
php -S localhost:8000
```

### Uploading of files

```
If you want to upload files bigger then 2MB (default value),
check how you have set up properties upload_max_filesize and post_max_size in your php.ini file
```

### Uploading of files

# Environment setup

## Production example

```
VUE_APP_API_URL=https://m4p0.neuewerte.kaylee.liioo.com/ (!!! deploying on localhost the url is / !!!)
NODE_ENV=production
BASE_URL=/subfolder
```

## Dev example

```
VUE_APP_API_URL=http://localhost:8000/
NODE_ENV=development
BASE_URL=/
```

## HTACCESS CONFIG
```

AuthType Basic
AuthName "Password Protected Area"
AuthUserFile /home/neuewerte/websites/m4p0.neuewerte.kaylee.liioo.com/htdocs/editor/.htpasswd
Require valid-user
```
