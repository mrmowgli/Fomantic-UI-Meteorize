/******************************/
/* INFO TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const template = require('gulp-template');

var infoTasks = [
  'info:remove',
  'info:template',
  'info:setvariable',
];

gulp.task('info:remove', gulp.series( callback => del(['./tmp/info.js'], callback)));

gulp.task('info:template', gulp.series( callback => {
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
}));

gulp.task('info:setvariable', gulp.series( callback => {
  info = require('../tmp/info');
  callback();
}));

gulp.task('info', gulp.series(infoTasks));
