/**
**spapp generator, inline templates in html file, also create skeleton for a new ctrl+tpl
**/
module.exports = function(grunt) {
  var path = require("path");
  grunt.registerTask('spapp_generator', 'SPapp generator', function(arg1, arg2) {


    var conf = grunt.config('spapp_generator');

    if (!conf.src || !conf.dest) {
      grunt.log.error('files src and dest not found in' + this.name +' options');
      return;
    }

    if (!arg1){
      grunt.log.error('please provide target( ' + this.name + ':inline_template or ' + this.name + ':new)');
      return;
    }

    if (arg1=='inline'){
      return importTemplates(conf.src, conf.dest, conf.options.basePath);
    }else if (arg1=='new'){
      return newTemplate(conf);
    }

  });

  var importTemplates = function(src, dest, appPath){
    var content = grunt.file.read(src);

    var newContent = content.replace(/<section id="(.*?)" src="(.*?)">/ig, function(match, p1, p2){
      var tplFile = path.join(appPath,p2 );
      return '<section id="' + p1 + '">\r\n' + grunt.file.read(tplFile) + '\r\n';
    });
    grunt.file.write(dest, newContent);
    grunt.log.ok('import templates to :' + dest);

  }

  var newTemplate = function(conf){
    var name = grunt.option('name');
    if (!name){
      grunt.log.error('please provide a controller/template name: spapp_generator:new --name=ctrl_name' )
      return;
    }

    //generate template
    var tplFilePath = path.join(conf.options.basePath, conf.options.templateFolder, name + '.html');
    if (grunt.file.isFile(tplFilePath)){
      grunt.log.error('already found a file here:' + tplFilePath);
      return;
    }

    var content = '<div><!-- here my html component --></div>'; //minimum content
    grunt.file.write(tplFilePath, content);
    grunt.log.ok('created a template file :' + tplFilePath);


    //generate js
    var jsFilePath = path.join(conf.options.basePath, conf.options.scriptFolder, name + '.js');
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

    var content = grunt.file.read(conf.src);
    var newContent = content.replace('<!-- @spapp_generator scripts -->', '<script src="scripts/'+ name + '.js"></script>\r\n<!-- @spapp_generator scripts -->\r\n');
    newContent = newContent.replace('<!-- @spapp_generator sections -->','<section id="'+ name +'" src="templates/'+ name +'.html"></section>\r\n<!-- @spapp_generator sections -->');
    if (content !== newContent) {
      grunt.file.write(conf.src, newContent);
      grunt.log.ok('add script and section to file :' + conf.src);
    }

    //declare section in css file
    var cssFilePath = path.join(conf.options.basePath, conf.options.css);
    var content = grunt.file.read(cssFilePath);
    var newContent = content.replace('/*@spapp_generator css*/','body.'+ name +'   > section#'+ name +',\r\n/*@spapp_generator css*/');
    grunt.file.write(cssFilePath, newContent);
    grunt.log.ok('add section css declaration to file :' + cssFilePath);
  }



}
