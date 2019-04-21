var info = {};

info.pkg = {
  name: 'mrmowgli:fomantic-ui',
  version: '<%= pkgVersion %>',
  base: './dist/fomantic-ui',
  git: 'git@github.com:mrmowgli/Fomantic-UI-Meteor.git'
};

// If changing version, need to update info.pkg.version because it depends on this version
info.pkgData = {
  name: 'mrmowgli:fomantic-ui-data',
  version: '<%= pkgDataVersion %>',
  base: './dist/fomantic-ui-data',
  lib: './dist/fomantic-ui-data/lib',
  git: 'git@github.com:mrmowgli/Fomantic-UI-Meteor-Data.git',
  fomanticUi: './dist/fomantic-ui-data/lib/fomantic-ui'
};

info.fomantic = {
  repo: 'https://github.com/fomantic/Fomantic-UI-LESS.git',
  tag: "<%= fomanticVersion %>",
  baseSrc: 'tmp/fomantic-ui-original',
  baseDest:'tmp/fomantic-ui-modified',
  themesUrl: '/lib/fomantic-ui/src/themes/'
};

var srcSourcePath = info.fomantic.baseSrc + '/src';
var src = {
  srcPath: srcSourcePath,
  allFiles: srcSourcePath + '/**/*.*',
  allLessFiles: srcSourcePath + '/**/*.less',
  definitionsLess: srcSourcePath + '/definitions/**/*.less',
  allSiteFiles: srcSourcePath + '/_site/**/*.*',
  allThemesFiles: srcSourcePath + '/themes/**/*.*',
  themeConfigFile: srcSourcePath + '/theme.config.example',
  themeLessFile: srcSourcePath + '/theme.less'
};
info.fomantic.src = src;

var destSourcePath = info.fomantic.baseDest + '/src';
var relativePath = 'lib/fomantic-ui/src';

var dest = {
  srcPath: destSourcePath,
  sitePath: destSourcePath + '/site',
  themeVariablesFiles: destSourcePath + '/themes/**/*.variables.import.less',
  themesPath: destSourcePath + '/themes',
  allFiles: destSourcePath + '/**/*.*',
  allDefinitionsFiles: destSourcePath + '/definitions/**/*.*',
  allThemesFiles: destSourcePath + '/themes/**/*.*',
  allThemesAssetsFiles: destSourcePath + '/themes/**/assets/**/*.*',
  allSitesFiles: destSourcePath + '/site/**/*.*',
  themeConfigFileRelativePath: relativePath + '/theme.config.import.less',
  semanticLessFile: destSourcePath + '/semantic.less',
  semanticLessFileRelativePath: relativePath + '/semantic.less',
  themeLessFile: destSourcePath + '/theme.import.less',
  themeLessFileRelativePath: relativePath + '/theme.import.less',
  definitionsPath: destSourcePath + '/definitions'
};
info.semantic.dest = dest;

module.exports = info;
