/******************************/
/* INFO TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const template = require('gulp-template');
const runSequence = require('run-sequence');

gulp.task('info', function(callback) {
  var tasks = [
    'info:remove',
    'info:template',
    'info:setvariable',
    callback
  ];
  runSequence.apply(this, tasks);
});

gulp.task('info:remove', function(callback) {
  del(['./tmp/info.js'], callback);
});

gulp.task('info:template', function(callback) {
  if (fomanticVersion === "") {
    console.log('Fomantic version is missing.');
    process.exit(1);
  }
  const infoTemplate = './templates/info.js';
  return gulp.src(infoTemplate)
    .pipe(template({
      pkgVersion: packageVersion,
      pkgDataVersion: packageVersion,
      fomanticVersion: fomanticVersion
    }))
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('info:setvariable', function(callback) {
  info = require('../tmp/info');
  callback();
});
