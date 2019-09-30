# DISPLAY
Erkunde Museumsobjekte auf dem Smartphone 

## Was macht DISPLAY? 
Mit Display kann jede und jeder eine progressive Web-App (PWA) erstellen. Display ist eine Schritt für Schritt Vorlage. 

Die PWA ist ein digitales und innovatives Format Museumsobjekte BesucherInnen näher zu bringen. 

Die Webseite funktioniert wie eine App. Sie zeigt 3D-Museumsobjekte in Rundum-Ansicht an. Das digitale Objekt lässt sich in alle Richtungen drehen und wenden und zeigt so, was beim realen Objekt verborgen bleibt – beispielsweise die Unterrseite. Das Erkunden gelingt auf andere Weise als beim Objekt in der Glasvitrine. 

An den 3D-Objekten sind Infopunkte angelegt. Die Infopunkte halten Texte oder Fragestellungen bereit. Verschiedene Infopunkte werden zu Erzählsträngen verbunden. Sie vernetzen Zusammenhänge. Damit können BesucheInnen Exponate im Detail untersuchen.Im Fokus steht das Eigeninteresse der BesucherInnen zu wecken. 

* DISPLAY ist zu 100% open-source und zu 100%  kostenfrei (veröffentlicht unter der GNU Lizenz).
* DISPLAY ist ein Gerüst oder Arbeitsumfeld, zur Erarbeitung einer progressiven Web-App für 3D Museumsobjekte. 
* DISPLAY wird als Tutorial Hinweise und Tipps geben zur Installation, der benötigten technischen Ausstattungen und Inbetriebnahme.
* DISPLAY  soll Lust schaffen es zu produzieren. 

## Die Idee hinter dem Konzept? 
Warum überhaupt? Es gibt eine Fülle an Informationen, die keinen Platz im Ausstellungsraum finden. BesucherInnen haben ein individuelles Bedürfnis nach Informationen und Kontexten. Digital können viele Inhalte präsentiert werden.

Warum 3D-Objekte? Weil sie (sowieso) zur Dokumentation in Museen hergestellt werden. Durch die Web-App werden die Modelle auch für die BesucherInnen nutzbar gemacht.

Warum eine nicht-lineare Erzählstruktur? Es ist übersichtlich. Es vernetzt Zusammenhänge schrittweise. Dies steigert das explorative Entdecken. Es fördert die Eigeninitiative und stärkt das Eigeninteresse. Alles nach den individuellen Bedürfnissen der BesucherInnen. 

## Warum eine progressive Web-App? 
Eine PWA ist eine Webseite, die wie eine App funktioniert. 
Das Konzept der PWA kombiniert die Vorteile von Webseiten und Apps:

als Webseite: Betriebssystemunabhängig, wird mit dem Browser aufgerufen und nicht über den App-Store installiert
als App: offline Funktionalität, ist vorteilhaft bei schlechter Internetverbindung, kann Homescreen-Icon, Push-Benachrichtigungen einrichten
Link: 
* https://www.ionos.de/digitalguide/websites/web-entwicklung/progressive-web-apps-welche-vorteile-bieten-sie/ oder
* https://praxistipps.chip.de/progressive-web-apps-was-ist-das-einfach-erklaert_98066 

## Technische Voraussetzungen
Benötigt wird folgendes. Wenn Du nicht weißt was es ist oder wo Du es bekommen kannst, brauchst du entweder eine WebentwicklerIn oder viel Zeit mit Begeisterung am Lernen. DISPLAY  soll Lust schaffen selbständig zu produzieren. Die Infrastruktur der Webentwicklungsumgebung
* Editor (hier Links mit Empfehlungen) 
* Webspace 
* Domain 
* Framework (Dateien zum runterladen) 
* 3D Objekte
* Inhalte 

Um die Funktionen der PWA nutzbar zu machen, müssen wenige technische Voraussetzungen erfüllt sein. Hierzu informieren die Browserentwickler: LIIIIIINKs 
* https://www.websecurity.symantec.com/de/de/security-topics/what-is-ssl-tls-https oder
* https://www.datenschutzbeauftragter-info.de/ssl-und-tls-verschluesselung-im-internet/ oder
* https://de.wikipedia.org/wiki/Transport_Layer_Security 

## Inhaltliche Voraussetzungen 
Die Konzeption der Infopunkte ist ein Zusammenspiel aus kuratorischer und Bildungs- und Vermittlungsarbeit.Wertvoll sind Anregungen zur eigenständigen Auseinandersetzung mit dem Museumsobjekt. Fragen stellen, anstelle Wissen listen, ebenfalls ein Motto. Die Textproduktion ist den eigenen Ansätzen und kreativen Schreibwerkstätten übergeben. Herausforderung ist die nicht lineare Erzählstruktur.
Was bedeutet nicht lineares Erzählen? 
Nicht-linear Erzählen bedeutet LeserInnen können an beliebiger Stelle einsteigen. Jeder Absatz muss demzufolge für sich alleine stehen können. Wie funktioniert das?
So schreibe ich nicht-linear am 3D-Objekt
1. (Stilistisch/Rhetorisch) Wiederholungen im Text  - man weiß … wo die Leser*innen einsteigen 
2. (Stilistisch/Rhetorisch) Verweise – „wie vorher erläutert“ funktioniert nicht, Verweise müssen jedes mal ausformuliert werden
3. (Visuell) Markierung/ Infopunkt als Argument –Behauptung + Beweis = Argument
4. (Strukturell Qualität ) 3 Vertiefungsebenen – Überschrift, Details, mehr Details
5. (Strukturell Quantität) Viele Argumenten und Beweise machen – Browseffekt, breites angebot 

## Digitalisierung, -sate: 3D Objekte 
Tbc. By Fanet
Interoperabel: Auflösung? Dateiformat? Wie könnte man 3D Scanns in Auftrag geben? „Wir machen eine Web-App mit 3D Objekten, haben die das Format?“

## Anleitung - Ran ans A-Z ans Schritt für Schritt
1. Vision für die Mission nennen
2. Inhalte in Redaktion geben
3. Nun die Technik: Laptop auf, denkender Kopf an, klickende/tippende Hände bereit
4. Installieren von folgenden Programmen (Links + Erklärung) 
5. …
6. Design ans Hauseigene anpassen 
7. Testen
8. In  Betriebsnahem 
9. .. 
10. Pflege/Wartung / Abänderung 

## Außerdem? 

## Beispiel: Prototyp xplore Highlights 

-----
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
