/******************************/
/* DATA TASKS
/******************************/
const gulp = require('gulp');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');

var replaceRegexp = /tmp\/fomantic-ui-modified/g;
var replaceWith = 'lib/fomantic-ui';

gulp.task('data:definitions-json', function() {
  return gulp.src(info.fomantic.dest.allDefinitionsFiles)
    .pipe(require('gulp-filelist')('definitions.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'));
});

gulp.task('data:themes-json', function() {
  return gulp.src(info.fomantic.dest.allThemesFiles)
    .pipe(require('gulp-filelist')('themes.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'));
});

gulp.task('data:sites-json', function() {
  return gulp.src(info.fomantic.dest.allSitesFiles)
    .pipe(require('gulp-filelist')('sites.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'));
});

gulp.task('data', function(callback) {
  var tasks = [
    'data:definitions-json',
    'data:themes-json',
    'data:sites-json',
    callback
  ];
  runSequence.apply(this, tasks);
});
