/******************************/
/* CLEAN TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');

gulp.task('clean', gulp.series( callback => del(['tmp', 'dist'], callback)));
