/******************************/
/* SEMANTIC UI DATA TASKS
/******************************/
const gulp = require('gulp');
const del = require('del');
const git = require('gulp-git');
const template = require('gulp-template');

gulp.task('fomantic-ui-data:clean', gulp.series( callback => del([info.pkgData.base], callback)));

gulp.task('fomantic-ui-data:clone', gulp.series(callback => {
  var options = {
    args: info.pkgData.base
  };
  git.clone(info.pkgData.git, options, callback);
}));

gulp.task('fomantic-ui-data:remove', gulp.series( callback => del([info.pkgData.fomanticUi], callback)));

gulp.task('fomantic-ui-data:copy', gulp.series(() => {
  var src = [
    info.fomantic.dest.allFiles
    ];
  return gulp.src(src)
    .pipe(gulp.dest(info.pkgData.fomanticUi + '/src'));
}));

gulp.task('fomantic-ui-data:templates', gulp.series(() => {
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
}));

var fomaTasks = [
  'fomantic-ui-data:clean',
  'fomantic-ui-data:clone',
  'fomantic-ui-data:remove',
  'fomantic-ui-data:copy',
  'fomantic-ui-data:templates',
];
gulp.task('fomantic-ui-data', gulp.series(fomaTasks));
