## Guia
* Crear carpeta "nombredelproyecto"
* Ingresar a la carpeta con  ```cd nombredelproyecto```
* Ejecutar el comando ```npm init -y```
* Instalar todas la dependencias necesarias para iniciar el proyecto
    ```
    npm install express dotenv ejs 
    ```
    Dependencias de desarollo 

    ```
    npm install -D @types/express @types/node
    ```
* Crear archivo tsconfig.json
```
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true,
    }
}
```

* Crear estructara 
```
test-mvc-express/
  ├─ src/
  │   ├─ controllers/
  │   ├─ views/
  │   ├─ routes/
  │   ├─ models/
  ├─ server.ts
  ├─ package.json
  ├─ tsconfig.json

```

* agregar script en el package.json
```
		"dev": "nodemon server.ts"
```

* Crear repositorio en git con github Desktop

## Iniciar proyecto
1. Clonar proyecto
2. Instalar depencias ```npm install```
3. Configurar variables de entorno en el archivo  ```.env ```
4. Ejecutar  ```docker-compose up -d```


### Instalacion de TypeORM
1. ```npm install typeorm --save```
2. ```npm install reflect-metadata --save```
3. ```npm install mysql2 --save```

### Sessions
```npm install express-session@1.17.0 cookie-parser```
```npm i --save-dev @types/express-session @types/cookie-parser ```
 

### Layout expres ejs

express-ejs-layouts
Layout support for ejs in express

npm version build status

Installation
$ npm install express-ejs-layouts
Example
Check the example folder.

git clone https://github.com/soarez/express-ejs-layouts.git
cd express-ejs-layouts
npm install
node example
Open http://localhost:3000/
Usage
var express = require('express');
var expressLayouts = require('express-ejs-layouts');

var app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.get('/', function(req, res) {
  var locals = {
    title: 'Page Title',
    description: 'Page Description',
    header: 'Page Header'
  };
  res.render('the-view', locals);
});

app.listen(3000);
contentFor
A view

tyler
<%- contentFor('foo') %>
club
<%- contentFor('bar') %>
fight
With a layout

<%-bar%> <%-foo%>
<%-body%>
Renders

fight club
tyler
As another example, consider this view:

foo
<%- contentFor('pageSectionA') %>
bar
<%- contentFor('pageSectionB') %>
baz
Using it with this layout:

<div class="header"><%- pageSectionA %></div>
<div class="body"><%- body %></div>
<div class="footer"><%-defineContent('pageSectionB')%></div>
Will render:

<div class="header">bar</div>
<div class="body">foo</div>
<div class="footer">baz</div>
Notice that the difference between using <%- pageSectionA %> and <%-defineContent('pageSectionA')%> is that the former will generate an error if the view doesn't define content for this section.

Script blocks extraction
If you like to place all the script blocks at the end, you can do it like this:

app.set("layout extractScripts", true)
A view

something<script>somejs<script>something
With a layout

<body>
  <%- body %>
  <%- script %>
</body>
Renders

<body>
  somethingsomething
  <script>somejs<script>
</body>
Enabling invididually:

req.render('view', { extractScripts: true })
When the "layout extractScripts" option is activated, scripts defined in views will be extracted (won't be a part of body) and will be available for use in the layout through the variable scripts.

Another example:

This view:

<script src="/b.js" />
<div>foo</div>
<script src="/a.js" />
<div>bar</div>
<script src="/c.js" />
Used with this layout:

<div class="main">
<%- body %>
</div>
<!-- place the scripts at the end of the html page -->
<%- script %>
Will render:

<div class="main">
<div>foo</div>
<div>bar</div>
</div>
<!-- place the scripts at the end of the html page -->
<script src="/b.js" />
<script src="/a.js" />
<script src="/c.js" />
Style blocks extraction
Works exactly like script blocks extraction except:

Supported tags are <link rel="stylesheet" …> and <style …>
The option is named extractStyles
The template variable in layout is style
Meta blocks extraction
Works exactly like script blocks extraction except:

Supported tags are <meta …> and <meta …/>
The option is named extractMetas
The template variable in layout is meta
Set custom default layout
By default 'layout.ejs' is used. If you want to specify your custom layout (e.g. 'layouts/layout.ejs'), just set layout property in express app settings.

app.set('layout', 'layouts/layout');
Set custom layout for single render
Just pass layout as render locals object.

app.get('/', function(req, res) {
  res.render('the-view', { layout: 'specific-layout' });
});
Set no layout for single render
Just pass layout: false as render locals object.

app.get('/', function(req, res) {
  res.render('the-view', { layout: false });
);
Optional sections
In a layout, you can have optional sections using defineContent: Unspecified section content defaults to ''.

1
<%-defineContent('a')%>
2
<%-defineContent('b')%>
3
with a view:

<%- contentFor('a') %>
1.5```