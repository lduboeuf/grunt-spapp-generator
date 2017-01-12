/**
**spapp generator, inline templates in html file, also create skeleton for a new ctrl+tpl
**/
module.exports = function(grunt) {
  var path = require("path");
  grunt.registerTask('spapp_generator', 'SPapp generator', function(arg1, arg2) {


    var conf = grunt.config('spapp_generator');
    var template_folder = conf.template_folder || 'templates';
    var script_folder = conf.script_folder || 'scripts';
    var cssFile = conf.css;

    if (!conf.src || !conf.dest) {
      grunt.log.error('files src and dest not found in' + this.name +' options');
      return;
    }

    if (!arg1){
      grunt.log.error('please provide target( ' + this.name + ':inline_template or ' + this.name + ':new)');
      return;
    }

    if (arg1=='inline'){
      return importTemplates(conf.src, conf.dest, template_folder);
    }else if (arg1=='new'){
      return newTemplate(conf.src, template_folder, script_folder, cssFile);
    }

  });

  var importTemplates = function(src, dest, template_folder){
    var content = grunt.file.read(src);

    var newContent = content.replace(/<section id="(.*?)" src="(.*?)">/ig, function(match, p1, p2){
      var tplFile = path.join(grunt.config.get('appConfig.app'),p2 );
      return '<section id="' + p1 + '">\r\n' + grunt.file.read(tplFile) + '\r\n';
    });
    grunt.file.write(dest, newContent);
    grunt.log.ok('import templates to :' + dest);

  }

  var newTemplate = function(htmlFile, template_folder, script_folder, cssFile){
    var name = grunt.option('name');
    if (!name){
      grunt.log.error('please provide a controller/template name: spapp_generator:new --name=ctrl_name' )
      return;
    }

    //generate template
    var tplFilePath = path.join(template_folder, name + '.html');
    if (grunt.file.isFile(tplFilePath)){
      grunt.log.error('already found a file here:' + tplFilePath);
      return;
    }

    var content = '<div><!-- here my html component --></div>'; //minimum content
    grunt.file.write(tplFilePath, content);
    grunt.log.ok('created a template file :' + tplFilePath);


    //generate js
    var jsFilePath = path.join(script_folder, name + '.js');
    if (grunt.file.isFile(jsFilePath)){
      grunt.log.error('already found a file here:' + jsFilePath);
      return;
    }

    //var contentInit = grunt.file.read('script.tpl');
    //var newContent = contentInit.replace('tpl_name',name);
    var newContent = ['app.page("'+ name +'", function() { ',
      ' //your code here called once',
      ' return function(params) {',
      '   //your code called each time view is called',
      ' }',
      '});'
     ].join('\n');
    grunt.file.write(jsFilePath, newContent);
    grunt.log.ok('created a script file :' + jsFilePath);

    //modify html file

    var content = grunt.file.read(htmlFile);
    var newContent = content.replace('<!-- @spapp_generator scripts -->', '<script src="scripts/'+ name + '.js"></script>\r\n<!-- @spapp_generator scripts -->\r\n');
    newContent = newContent.replace('<!-- @spapp_generator sections -->','<section id="'+ name +'" src="templates/'+ name +'.html"></section>\r\n<!-- @spapp_generator sections -->');
    if (content !== newContent) {
      grunt.file.write(htmlFile, newContent);
      grunt.log.ok('add script and section to file :' + htmlFile);
    }

    //declare section in css file
    var content = grunt.file.read(cssFile);
    var newContent = content.replace('/*@spapp_generator css*/','body.'+ name +'   > section#'+ name +',\r\n/*@spapp_generator css*/');
    grunt.file.write(cssFile, newContent);
    grunt.log.ok('add section css declaration to file :' + cssFile);
  }



}
