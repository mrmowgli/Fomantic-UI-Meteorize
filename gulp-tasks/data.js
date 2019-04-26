/******************************/
/* DATA TASKS
/******************************/
const gulp = require('gulp');
const replace = require('gulp-replace');

var replaceRegexp = /tmp\/fomantic-ui-modified/g;
var replaceWith = 'lib/fomantic-ui';

gulp.task('data:definitions-json', gulp.series(() => 
  gulp.src(info.fomantic.dest.allDefinitionsFiles)
    .pipe(require('gulp-filelist')('definitions.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'))
));

gulp.task('data:themes-json', gulp.series(() => 
  gulp.src(info.fomantic.dest.allThemesFiles)
    .pipe(require('gulp-filelist')('themes.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'))
));

gulp.task('data:sites-json', gulp.series(() => 
  gulp.src(info.fomantic.dest.allSitesFiles)
    .pipe(require('gulp-filelist')('sites.json'))
    .pipe(replace(replaceRegexp, replaceWith))
    .pipe(gulp.dest('./tmp/data'))
));

var dataTasks = [
  'data:definitions-json',
  'data:themes-json',
  'data:sites-json',
];

gulp.task('data', gulp.series(dataTasks));
