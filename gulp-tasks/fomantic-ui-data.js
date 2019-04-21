/******************************/
/* SEMANTIC UI DATA TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const git = require('gulp-git');
const template = require('gulp-template');
const runSequence = require('run-sequence');

gulp.task('fomantic-ui-data:clean', function(callback) {
  del([info.pkgData.base], callback);
});

gulp.task('fomantic-ui-data:clone', function(callback) {
  var options = {
    args: info.pkgData.base
  };
  git.clone(info.pkgData.git, options, callback);
});

gulp.task('fomantic-ui-data:remove', function(callback) {
  del([info.pkgData.fomanticUi], callback);
});

gulp.task('fomantic-ui-data:copy', function() {
  var src = [
    info.fomantic.dest.allFiles
    ];
  return gulp.src(src)
    .pipe(gulp.dest(info.pkgData.fomanticUi + '/src'));
});

gulp.task('fomantic-ui-data:templates', function() {
  var definitions = require('../tmp/data/definitions.json');
  var themes = require('../tmp/data/themes.json');
  var sites = require('../tmp/data/sites.json');
  return gulp.src('./templates/fomantic-ui-data/**')
    .pipe(template({
      definitions: JSON.stringify(definitions),
      themes: JSON.stringify(themes),
      sites: JSON.stringify(sites),
      info: info
    }))
    .pipe(gulp.dest(info.pkgData.base));
});

gulp.task('fomantic-ui-data', function(callback) {
  var tasks = [
    'fomantic-ui-data:clean',
    'fomantic-ui-data:clone',
    'fomantic-ui-data:remove',
    'fomantic-ui-data:copy',
    'fomantic-ui-data:templates',
    callback
  ];
  runSequence.apply(this, tasks);
});
