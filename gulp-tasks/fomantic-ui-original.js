/******************************/
/* FOMANTIC UI ORIGINAL TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const git = require('gulp-git');

gulp.task('fomantic-ui-original:clean', gulp.series( callback => 
  del(['./tmp/fomantic-ui-original'], callback)
));

gulp.task('fomantic-ui-original:clone', gulp.series( callback => {
  var options = {
    args: '-b ' + info.fomantic.tag + ' ' + info.fomantic.baseSrc
  };
  git.clone(info.fomantic.repo, options, callback);
}));

var tasks = [
  'fomantic-ui-original:clean',
  'fomantic-ui-original:clone',
];

gulp.task('fomantic-ui-original', gulp.series(tasks));
