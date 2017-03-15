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
      return importTemplates(conf);
    }else if (arg1=='new'){
      return newTemplate(conf);
    }

  });

  var importTemplates = function(conf){
    var content = grunt.file.read(conf.src);

    var destDir = path.dirname(conf.dest);
    var scriptsFile = conf.options.js;
    var cssFile = conf.options.css;
    var scripts = '';
    var css = '';

    var newContent = content.replace(/<section id="(.*?)" src="(.*?)"(.*?)>/ig, function(match, p1, p2, p3){
      var tplFilePath = path.join(conf.options.basePath,p2 );
      var tpl = grunt.file.read(tplFilePath);
            //extract any scripts ?
      var rawTpl = tpl.replace(/<script[^>]*>([\s\S]+?)<\/script>/ig, function(match, content){

        scripts +=content;
        return '';
      });

      rawTpl = rawTpl.replace(/<style>([\s\S]+?)<\/style>/ig, function(match, content){

        css +=content;
        return '';
      });

      return '<section id="' + p1 + '" '+ p3 +'>\r\n' + rawTpl + '\r\n';
    });


    if (scripts.length>0){
      grunt.file.write(scriptsFile, scripts);
      grunt.log.ok('concat all scripts to ', scriptsFile);
    }

    if (css.length>0){
      grunt.file.write(cssFile, css);
      grunt.log.ok('concat all styles to ', cssFile);

    }
    //grunt.log.ok('kikou:',newContent);
    grunt.file.write(conf.dest, newContent);
    grunt.log.ok('import templates to :' + conf.dest);


  }

  var newTemplate = function(conf){
    var namePath = grunt.option('name');

    if (!namePath){
      grunt.log.error('please provide a name: spapp_generator:new --name=folder/templatename' )
      return;
    }

    var dir = path.dirname(namePath);
    var name = path.basename(namePath);

    if (dir.length<2 || name.indexOf('.')>-1){
      grunt.log.error('please provide a valid folder/template name:e.g: spapp_generator:new --name=templates/hello' )
      return;
    }



    var targetFilePath = path.join(conf.options.basePath, namePath + '.html');
    if (grunt.file.isFile(targetFilePath)){
      grunt.log.error('already found a file here:' + targetFilePath);
      return;
    }

    var tplFilePath = __dirname + path.sep + 'tpl.html';
    var content = grunt.file.read(tplFilePath);
    var tpl = content.replace(/tpl_id/g, name);

    grunt.file.write(targetFilePath, tpl);
    grunt.log.ok('created a new template file  :' + targetFilePath);

    //modify html file
    var newSection = '\r\n<section id="'+ name + '" src="'+ namePath + '.html"></section>';
    var content = grunt.file.read(conf.src);
    var newContent = '';
    var pattern = '</section>';
    var pos =  content.lastIndexOf(pattern) + pattern.length;
    if (pos <=  pattern.length){ //will add just before body
      pos =  content.lastIndexOf('</body>');
    }

    if (pos>-1){
      newContent = insert(content,pos,newSection);
      grunt.file.write(conf.src, newContent);
      grunt.log.ok('added section declaration to file :', conf.src, ' now you should see something here:  ' + conf.src + '#' + name);
    }else{
      grunt.log.error('weird, can\'t find any section or body in your html :', conf.src);
    }



  }

  function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }


}
