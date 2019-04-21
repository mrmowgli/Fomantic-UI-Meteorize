/******************************/
/* FOMANTIC UI ORIGINAL TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const git = require('gulp-git');

gulp.task('fomantic-ui-original:clean', function(callback) {
  del(['./tmp/fomantic-ui-original'], callback);
});

gulp.task('fomantic-ui-original:clone', function(callback) {
  var options = {
    args: '-b ' + info.fomantic.tag + ' ' + info.fomantic.baseSrc
  };
  git.clone(info.fomantic.repo, options, callback);
});

gulp.task('fomantic-ui-original', function(callback) {
  var tasks = [
    'fomantic-ui-original:clean',
    'fomantic-ui-original:clone',
    callback
  ];
  runSequence.apply(this, tasks);
});
