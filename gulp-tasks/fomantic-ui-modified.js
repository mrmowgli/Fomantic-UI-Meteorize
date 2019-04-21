/******************************/
/* FOMANTIC UI MODIFIED TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const rename = require("gulp-rename");
const replace = require('gulp-replace');
const insert = require('gulp-insert');
const runSequence = require('run-sequence');

// Remove any existing temporary files.
gulp.task('fomantic-ui-modified:clean', function(callback) {
  del(['./tmp/fomantic-ui-modified'], callback);
});

// Copy the files accross to the src folder
gulp.task('fomantic-ui-modified:copy', function() {
  var src = [
    info.fomantic.src.allFiles,
    "!" + info.fomantic.src.definitionsLess,
    "!" + info.fomantic.src.themeConfigFile,
    "!" + info.fomantic.src.themeLessFile,
    "!" + info.fomantic.src.allSitesFiles,
    "!" + info.fomantic.src.allThemesFiles
    ];
  return gulp.src(src)
    .pipe(gulp.dest(info.fomantic.baseDest + '/src'));
});

// Rename for meteor specific handling, up to Meteor 1.7.x
// Meteor 1.8.x+ need to specifically required a less file.
gulp.task('fomantic-ui-modified:copy-sites', function() {
  var src = info.fomantic.src.allSiteFiles;
  return gulp.src(src)
    .pipe(rename(function(path) {
      path.extname = path.extname + '.import.less';
    }))
    .pipe(gulp.dest(info.fomantic.dest.sitePath));
});

// Copy over all themes an theme overrides.
gulp.task('fomantic-ui-modified:copy-themes', function() {
  var src = info.fomantic.src.allThemesFiles;
  return gulp.src(src)
    .pipe(rename(function(path) {
      if (path.extname == ".overrides" || path.extname == ".variables") {
        path.extname = path.extname + '.import.less';
      }
    }))
    .pipe(gulp.dest(info.fomantic.dest.themesPath));
});

// Copy accross less files and remname theme.config
gulp.task('fomantic-ui-modified:copy-definitions-less-files', function() {
  var src = info.fomantic.src.definitionsLess;
  var regexp = /\.\.\/\.\.\/theme\.config/;
  return gulp.src(src)
    //  This needs more investigation
    .pipe(replace(regexp, '../../theme.config.import.less'))
    .pipe(rename(function(path) {
      path.extname = '.import.less';
    }))
    .pipe(gulp.dest(info.fomantic.dest.definitionsPath));
});

// Changes theme.less in theme.config.example to theme.import.less and rename the file theme.config
gulp.task('fomantic-ui-modified:copy-theme-config', function() {
  var regexp = /theme.less/g;
  return gulp.src(info.fomantic.src.themeConfigFile)
    .pipe(replace(regexp, 'theme.import.less'))
    .pipe(rename(function(path) {
      path.extname = '.import.less';
    }))
    .pipe(gulp.dest(info.fomantic.dest.srcPath));
});

// Copies theme.less and adds .import.less to  @{site}/../*.overrides and variables and renames 
// the file theme.import.less
gulp.task('fomantic-ui-modified:copy-theme-less', function() {
  var regexp = /(@{siteFolder}|@{themesFolder})\/.+\.(variables|overrides)/g;
  return gulp.src(info.fomantic.src.themeLessFile)
    .pipe(replace(regexp, '$&.import.less'))
    .pipe(rename(function(path) {
      path.extname = '.import.less';
    }))
    .pipe(gulp.dest(info.fomantic.dest.srcPath));
});

//  Change the @imagePath/@fontPath to include the asset URL instead of a relative path. 
//  One of the file that will change is src/themes/default/globals/site.variables
gulp.task('fomantic-ui-modified:update-assets', function() {
  const url = info.fomantic.themesUrl;
  const regexp = /\.\.\/\.\.\/themes\/.+\/assets\/(images|fonts)('|");/g;
  const regexp2 = /\/lib\/fomantic-ui\/src\/themes\/\.\.\/\.\.\/themes\//g;
  return gulp.src(info.fomantic.dest.themeVariablesFiles)
    .pipe(replace(regexp, url + '$&'))
    .pipe(replace(regexp2, url))
    .pipe(gulp.dest(info.fomantic.dest.themesPath));
});

// Rename internal variables?  Investigate.
gulp.task('fomantic-ui-modified:update-fomantic-less', function() {
  var regexp = /"definitions\/\w+\/\w+/g;
  return gulp.src(info.fomantic.dest.fomanticLessFile)
    .pipe(replace(regexp, '$&' + '.import.less'))
    .pipe(gulp.dest(info.fomantic.dest.srcPath));
});

gulp.task('fomantic-ui-modified:add-header', function() {
  var header = [];
  header.push('/*');
  header.push('  DO NOT MODIFY - This file has been generated and will be regenerated');
  header.push('  Fomantic UI v' + info.fomantic.tag);
  header.push('*/');
  header.push('');

  var src = [
    info.fomantic.dest.allDefinitionsFiles,
    info.fomantic.dest.allThemesFiles,
    info.fomantic.dest.themeLessFile,
    info.fomantic.dest.fomanticLessFile,
    "!" + info.fomantic.dest.allThemesAssetsFiles
  ];
  return gulp.src(src, {base: info.fomantic.dest.srcPath})
    .pipe(insert.prepend(header.join('\n')))
    .pipe(gulp.dest(info.fomantic.dest.srcPath));
});

gulp.task('fomantic-ui-modified', function(callback) {
  var tasks = [
    'fomantic-ui-modified:clean',
    'fomantic-ui-modified:copy',
    'fomantic-ui-modified:copy-definitions-less-files',
    'fomantic-ui-modified:copy-theme-config',
    'fomantic-ui-modified:copy-theme-less',
    'fomantic-ui-modified:copy-sites',
    'fomantic-ui-modified:copy-themes',
    'fomantic-ui-modified:update-assets',
    'fomantic-ui-modified:update-fomantic-less',
    'fomantic-ui-modified:add-header',
    callback
  ];
  runSequence.apply(this, tasks);
});
