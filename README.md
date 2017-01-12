# grunt-spapp-generator

spapp-generator is intended to ease app developpement with micro MVC library [spapp](https://github.com/c-smile/spapp).

It allows you to create a template by creating required html and js files and corresponding declarations in index.html and css files.

For production, it allows you also to put inline every templates into declared sections.

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
        template_folder: 'templates folder',
        script_folder: 'scripts folder',
        css: 'css file'
      }
    }
});
```

In your `index.html`, place the block comment `<!-- @spapp_generator scripts -->` where you want your scripts file to be declared.
place the block comment `<!-- @spapp_generator sections -->` where you want spapp_generator to declare sections
place the block comment `/*@spapp_generator css*/` where you want spapp_generator to declare section in css file

### Usage Examples



```js
grunt.initConfig({
  spapp_generator: {
      src: 'src/index.html',
      dest:'dist/index.html',
      options: {
        template_folder: 'src/templates',
        script_folder: 'src/scripts',
        css:'style/main.css'
      }
    }
});
```

####Create controller/template skeleton

```shell
grunt spapp_generator:new --name=playlist
```
will generate 2 files: `templates/playlist.html` and `scripts/playlist.js`
 add this declarations in `src/index.html`:
```html
  <script src="scripts/playlist.js"></script>
  <!-- @import scripts -->
```
```html
  <section id="playlist" src="templates/playlist.html"></section>
  <!-- @import sections -->
```
and add section declaration in css `style/main.css`
```css
  body.playlist   > section#playlist
```

####include all templates inline

```shell
grunt spapp_generator:inline
```
will import add declared templates in `index.html`
from:
```html
  <section id="playlist" src="templates/playlist.html"></section>
```
to:
```html
  <section id="playlist">
    <div>
    <!--my template here-->
    </div>
  </section>
```

 and write it to `dist/index.html`
