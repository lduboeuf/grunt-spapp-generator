# grunt-spapp-generator

spapp-generator is a grunt plugin intended to ease app developpement with [spapp](https://github.com/c-smile/spapp) micro MVC library .

It allows you to:
  - create boilerplate code by creating a template and add corresponding declaration in index.html.
  - extract styles and scripts from templates and concatenate them in a file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install https://github.com/lduboeuf/grunt-spapp-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-spapp-generator');
```

## The "spapp_generator" task

### Overview
In your project's Gruntfile, add a section named `spapp_generator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  spapp_generator: {
      src: 'your source html file',
      dest:'your dest html file',
      options: {
        basePath: 'base folder',
        js:'where you want all scripts to be concatenate',
        css:'where you want all styles to be concatenate'
      }
    }
});
```


### Usage Examples



```js
grunt.initConfig({
  spapp_generator: {
      src: 'src/index.html',
      dest:'dist/index.html',
      options: {
        basePath: 'src',
        js:'.tmp/concat/spapp.js',
        css:'.tmp/concat/spapp.css'
      }
    }
});
```

####Create controller/template skeleton

```shell
grunt spapp_generator:new --name=playlist/playlist-details
```
will generate a template file: `playlist/playlist-details.html`

will add this declarations in `src/index.html`:

```html
  <section id="playlist-details" src="playlist/playlist-details.html"></section>
  <!-- @spapp_generator sections -->
```


####include all templates inline

```shell
grunt spapp_generator:inline
```
will import declared templates in `index.html`
e.g:
from:
```html
  <section id="playlist-details" src="playlist/playlist-details.html"></section>
```
to:
```html
  <section id="playlist-details">
    <div>
    <!--my template here-->
    </div>
  </section>
```

will extract from templates and concatenate all scripts to `.tmp/concat/spapp.js`,
will extract from templates and concatenate all styles to `.tmp/concat/spapp.css`,



 ##example of use

 [skeleton web app](https://github.com/lduboeuf/skeleton-web-app.git)
