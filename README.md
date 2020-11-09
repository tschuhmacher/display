## Codedokumentation über Readme-Datei
Die Dokumentation erfolgt in einer Readme-Datei, die im GitHub-Repositorium hinterlegt wird.
•	Die digitale Anwendung (einschließlich ihrer Schnittstellen) muss in geeigneter Weise verständlich und nachvollziehbar in Deutsch oder Englisch dokumentiert sein.
•	Die Dokumentation soll andere Museen und ihre Dienstleister in die Lage versetzen, die Struktur des Systems, den Ablauf der Datenverarbeitung, die Funktionen der einzelnen Einheiten und die Bedeutung von verwendeten Daten zu verstehen.

Der Text der Readme-Datei sollte mindestens folgende Abschnitte in folgender Reihenfolge enthalten:

<b>5.	Benutzung</b>
Beschreibt die Benutzung der Anwendung nach der Installation. Fügen Sie bestenfalls Screenshots ein, um die Handhabung zu illustrieren. Auch Anforderungen an Geräte / Ausstattung bzw. Systemvoraussetzungen für den Betrieb sollten hier genannt sein. Falls Ihre Anwendung über ein Backend verfügt, sollte Ihnen ein Benutzerhandbuch für die Backend-Nutzung vorliegen. Stellen Sie dieses bitte auch zur Verfügung indem Sie es (als PDF/A-3) im Github Repository hochladen und in der Readme-Datei darauf verlinken. Existiert zudem ein Betriebskonzept, sollten Sie dieses von hier aus per Link zugänglich machen.



Bitte formatieren Sie die einzelnen Abschnitte Ihres Readme als Überschriften. Im Readme-Editor setzen Sie dazu vor Abschnittsbegriffe ein #(+Leerzeichen). Dies erhöht die Lesbarkeit und vereinfacht die Auffindbarkeit z.B. von Lizenzinformationen. Weitere Hilfestellungen zur Anfertigung einer Readme-Datei und zur Codedokumentation finden Sie hier:
https://guides.github.com/features/wikis/#creating-a-readme
https://docs.github.com/en/github/building-a-strong-community/adding-a-license-to-a-repository
https://technical-reference.readthedocs.io/en/latest/developer-guidelines/02-readme.html
https://technical-reference.readthedocs.io/en/latest/developer-guidelines/03-documentation.html

# display – Starterkit zur Erstellung von Web-Apps für 3D-Objekte in Museen

Display ist eine Schritt für Schritt Vorlage, mit der jede und jeder eine progressive Web-App (PWA) erstellen kann. Die Display-PWA ist ein digitales und innovatives Medienformat Museumsobjekte BesucherInnen näher zu bringen. Indem Kontexte und Informationen am 3D-Museumsobjekt gezeigt werden, kann die Fülle an Informationen um Ausstellungsobjekte herum von Besucher\*innen individuell erkundet werden. Im Fokus steht dabei das Eigeninteresse der Besucher\*Innen.

##### Entstehungskontext

Das Starterkit für Progressive-Web-Apps _dispay_ ist entstanden im Verbundprojekt museum4punkt0 – Digitale Strategien für das Museum der Zukunft, Teilprojekt [Visitor Journeys neu gedacht – digitale Erweiterung des Museumsbesuchs](https://www.museum4punkt0.de/teilprojekt/visitor-journeys-neu-gedacht-digitale-erweiterung-des-museumsbesuchs/), Staatlichen Museen zu Berlin – Preußischer Kulturbesitz. Weitere Informationen: www.museum4punkt0.de

The staterkit _display_ is part of the project museum4punkt0 - Digital Strategies for the Museum of the Future, sub-project [Rethinking Visitor Journeys – The Digital Enhancement of Museum Visits](https://www.museum4punkt0.de/en/subproject/rethinking-visitor-journeys-the-digital-enhancement-of-museum-visits/) , Staatlichen Museen zu Berlin – Preußischer Kulturbesitz. Further information: www.museum4punkt0.de/en/

##### Förderung
Das Projekt museum4punkt0 wird gefördert durch die Beauftragte der Bundesregierung für Kultur und Medien aufgrund eines Beschlusses des Deutschen Bundestages.

The project museum4punkt0 is funded by the Federal Government Commissioner for Culture and the Media in accordance with a resolution issued by the German Bundestag (Parliament of the Federal Republic of Germany).

Table of Content  
[1. Getting Started](#Getting-Started)  
[2. Viewer](#2-viewer)  
[3. Editor ](#3-editor)  
[4. Adding new language (optional)](#4-Adding-new-language-optional)
[5. Usage](5-usage)
[6. Examples](6-examples)


## 1. Getting Started
The display repositiory contains two components the main app the viewer and an optional editor. After cloning the repository follow the instructions to setup the viewer and optional add the editor to your web-app.

- display is build in [vue.js](https://vuejs.org/). For questions about concepts, components and methods of Vue please see [their docs](https://vuejs.org/v2/guide/).
- display's model-viewer and is based on [three.js](https://threejs.org/), [reference]( https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene).
- package management is done by [yarn](https://yarnpkg.com/).


## 2. Viewer

### 2.1. Setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn run serve
```

#### Compiles and minifies for production

```
yarn run build
```

#### Lints and fixes files

```
yarn run lint
```

### 2.2. File structure

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

### 2.3. Deployment process

#### Steps

1. Change .env variables for production (see [Environment setup](#Environment-setup))
2. Build the apps

```text
yarn run build
cd editor
yarn run build
```

3. The `dist` folders are ready for deployment
4. Add php scripts in `server/api/` to the root folder on the webserver

### 2.4. CSS

#### Introduction

Global css that applies to the whole app can be find in `/App.vue`. Other styles in `.vue` files are applied only to the specific component and they are not affecting other component styling (see [Vue scoped css](https://vue-loader.vuejs.org/guide/scoped-css.html)). [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is used heavily to create any layout in the app. Very few components are used from [Vuetify framework](https://vuetifyjs.com). `EM` were used as a relative unit to the currently chosen font size. Horizontal viewport-relative units are used for determining offsets.

#### The global styles

The global styles in `/App.vue`

- `#app` main component, apply fonts, fallback bg, font color etc.
- `#nav` fixed navigation, other content is pushed down by the offset relative to the height of the navigation component
- `.custom-layout` can be find in many instances for the horizontal offset
- `.content` container of the app's content with menu height offset
- `.content__page` apply only for 'static' pages like Exhibition, Impressum etc.
- `.content__page-main` wrapper for the main content

####  Component styles

Other styles in `.vue` components apply only to specific component and further comments can be find there.



### 2.5. Server Config Single Page App

#### HTACCESS CONFIG

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [NC,L,QSA]
```

### 2.6 Environment setup

#### Production example

```
VUE_APP_API_URL=https://www.yourwebsite.com/ (!deploying on localhost the url is / !)
NODE_ENV=production
BASE_URL=/subfolder
```

#### Dev example

```
VUE_APP_API_URL=/  (e.g. localhost)
NODE_ENV=development
BASE_URL=/
```


## 3. Editor (optional)

### 3.1. Setup

```
cd editor
yarn install
yarn serve
```

#### Start the PHP webserver

```
cd server
php -S localhost:8000
```

#### Uploading of files

```
If you want to upload files bigger then 2MB (default value),
check how you have set up properties upload_max_filesize and post_max_size in your php.ini file
```

### 3.2. Protect your editor e.g. Basic Auth by HTACCESS
####  HTACCESS CONFIG
```

AuthType Basic
AuthName "Password Protected Area"
AuthUserFile /YOUR_DIR/editor/.htpasswd
Require valid-user
```


## 4. Adding new language (optional)

Adding new language requires addition development.

- In `config.json` every language version is represented by the item in the main array. To add a new language version another second-level array containing information about obects need to be pushed to the first-level array.
- In `Vue.js`, `navigationLanguageItems` needs to be updated with another language item.
- However, because the language change is not registered now in global state, the change is happening inside idividual components. Therefore, some sort of switch statement needs to be implemented across the app to react and switch between selected language or move current selected language to the global store and distribute the state to the components that needs to react to language change.


## 5. Usage
After compiling for development by ```yarn serve``` direct your browser to the proposed localhost. By editing config.json and config2.json you will able to manipulate the shown content.

### 3d-Models



## 6. Examples

#### Xplore Highlights:

Anwendung zur Ausstellung Humboldt Forum Highlights auf der Museumsinsel,
Highlight ist hier die Maya-Vase, bei der die Funktion der Erzähllinien genutzt wird.

https://xplore.museum4punkt0.de


#### Bronzen wie Tiere (Münzkabinett der SMB):

Heide Dobberkau und ihre Tierwelten.

In der Ausstellung des Münzkabinetts begegnen Heide Dobberkaus »Bronzen wie Tiere« Tierwesen auf Münzbildern aus vier Jahrtausenden und treten mit aktuellen Tiermedaillen in Dialog.

In der Anwendung können Kleinplastiken, Medaillen und antike Münzen erkundet werden.

https://xplore.museum4punkt0.de/mk-pwa


#### Diesen Kuss der ganzen Welt (Staatsbibliothek zu Berlin)

Ausstellung der Autographen-Sammlung von Ludwig van Beethoven:

Highlights sind der Scan der Lebendmaske Ludwig van Beethovens sowie der Scan der ergänzenden Takte zur Sinfonie Nr. 9 mit handschriftlichen Ergänzungen

https://blog.sbb.berlin/wp-content/uploads/sbb-pwa/



<b>6.	Ggf. Beteiligung / Contributing</b>
(Optional) Geben Sie hier an, ob und in welcher Art man sich an Ihrer Programmierung beteiligen kann. Detailinformationen werden in einer separaten Datei angelegt. Weitere Hinweise hierzu finden Sie unter https://help.github.com/en/articles/setting-guidelines-for-repository-contributors

<b>7.	Credits</b>
Auftraggeber\*in/Rechteinhaber\*in (Name Ihrer Institution)
Urheber*innen (Namen der beteiligten Entwickler*innen oder Firma)
Die Autor*iInnen des Codes bzw. zugehörige Agenturen/Firmen/Institutionen können hier verlinkt sein.
evtl. Rechteangabe nach dem Schema: Institution / Urheber*in, Jahr

<b>8.	Lizenz / License</b>
Geben Sie hier an, unter welcher Lizenz der Quellcode/die Anwendung steht. Fügen Sie dabei den Lizenztext direkt im Readme ein bzw. linken zu dem zutreffenden Lizenztext.
Bitte fügen Sie ferner eine Liste der Lizenzen für wiederverwendete Programmteile Dritter der Dokumentation hinzu.
