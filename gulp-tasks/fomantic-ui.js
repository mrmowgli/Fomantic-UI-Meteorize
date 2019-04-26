/******************************/
/* FOMANTIC UI TASKS (Get Fomantic from Git Repo)
/******************************/
const gulp = require('gulp');
const del = require('del');
const template = require('gulp-template');
const git = require('gulp-git');
const getFomanticDefinitions = require('../lib/definition.js');
const getFomanticThemes = require('../lib/themes.js');
const getFomanticSites = require('../lib/sites.js');

gulp.task('fomantic-ui:clean', gulp.series( callback => del([info.pkg.base], callback)));

gulp.task('fomantic-ui:clone', gulp.series( callback => {
  var options = {
    args: info.pkg.base
  };
  git.clone(info.pkg.git, options, callback);
}));

gulp.task('fomantic-ui:templates', gulp.series(() => 
  gulp.src('./templates/fomantic-ui/**/*')
    .pipe(template({
      info: info,
      fomanticDefinitions: getFomanticDefinitions(require('../tmp/data/definitions.json')),
      fomanticThemes: getFomanticThemes(require('../tmp/data/themes.json')),
      fomanticSites: getFomanticSites(require('../tmp/data/sites.json')),
      fomanticThemeConfigFile: info.fomantic.dest.themeConfigFileRelativePath,
      fomanticThemeLessFile: info.fomantic.dest.themeLessFileRelativePath,
      fomanticLessFile: info.fomantic.dest.fomanticLessFileRelativePath
    }))
    .pipe(gulp.dest(info.pkg.base))
));

var tasks = [ 
  'fomantic-ui:clean',
  'fomantic-ui:clone',
  'fomantic-ui:templates'
]

gulp.task('fomantic-ui', gulp.series(tasks));
