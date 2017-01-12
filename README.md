# grunt-spapp-generator

spapp-generator is intended to ease app developpement with micro MVC framework [spapp](https://github.com/c-smile/spapp).

It allows you to create a template by creating required html and js files and corresponding declarations in index.html (  you still have to register your section to css).

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
        template_folder: 'templates',
        script_folder: 'scripts'
      }
    }
});
```

In your `index.html`, place the block comment `<!-- @import scripts -->` where you want your scripts file to be declared.
place the block comment `<!-- @import sections -->` where you want spapp_generator to declare sections

### Usage Examples



```js
grunt.initConfig({
  spapp_generator: {
      src: 'src/index.html',
      dest:'dist/index.html',
      options: {
        template_folder: 'templates',
        script_folder: 'scripts'
      }
    }
});
```

####Create controller/template skeleton

```shell
grunt spapp_generator:new --name=playlist
```
will generate 2 files: `templates/playlist.html` and `scripts/playlist.js`
and add this declarations in `src/index.html`:
```html
  <script src="scripts/playlist.js"></script>
  <!-- @import scripts -->
```
```html
  <section id="playlist" src="templates/playlist.html"></section>
  <!-- @import sections -->
```

####include all templates inline

```shell
grunt spapp_generator:inline
```
will import all declared templates in `index.html` and write it to `dist/index.html`
