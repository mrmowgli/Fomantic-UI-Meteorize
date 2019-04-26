/*
  DO NOT MODIFY - This file has been generated by https://github.com/mrmowgli/Fomantic-UI-Meteorize
*/

Package.describe({
  name: '<%= info.pkgData.name %>',
  version: '<%= info.pkgData.version %>',
  summary: 'Data package for Fomantic UI Meteor',
  git: '<%= info.pkgData.git %>',
  documentation: 'README.md'
});

var definitions = <%= definitions %>;
var themes = <%= themes %>;
var sites = <%= sites %>;

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.addFiles('fomantic-ui-data.js', 'server');
  api.export(['fomanticUiDataPackage']);

  api.addAssets(definitions, 'server');
  api.addAssets(themes, 'server');
  api.addAssets(sites, 'server');
  api.addAssets('<%= info.fomantic.dest.themeLessFileRelativePath %>', 'server');
  api.addAssets('<%= info.fomantic.dest.fomanticLessFileRelativePath %>', 'server');
  api.addAssets('<%= info.fomantic.dest.themeConfigFileRelativePath %>', 'server');
});